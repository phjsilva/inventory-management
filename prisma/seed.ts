import 'dotenv/config';
import { PrismaClient } from '../src/generated/prisma/client';
import { PrismaPg } from '@prisma/adapter-pg';
import bcrypt from 'bcrypt';

const adapter = new PrismaPg({ connectionString: process.env.DATABASE_URL });
const prisma = new PrismaClient({ adapter });

async function main() {
    console.log('Iniciando seed...');

    // Limpa os dados existentes, na ordem certa (respeitando as foreign keys)
    await prisma.stockMovement.deleteMany();
    await prisma.product.deleteMany();
    await prisma.category.deleteMany();
    await prisma.user.deleteMany();

    // Usuário admin
    const hashedPassword = await bcrypt.hash('admin123', 10);
    const admin = await prisma.user.create({
        data: {
            name: 'Administrador',
            email: 'admin@estoque.com',
            password: hashedPassword,
            role: 'ADMIN',
        },
    });

    // Categorias
    const perifericos = await prisma.category.create({
        data: { name: 'Periféricos', description: 'Mouses, teclados e afins' },
    });

    const informatica = await prisma.category.create({
        data: { name: 'Informática', description: 'Componentes e acessórios de computador' },
    });

    // Produtos
    const mouse = await prisma.product.create({
        data: {
            name: 'Mouse Gamer X',
            description: 'Mouse óptico com 6 botões programáveis',
            sku: 'MOU-001',
            price: 149.9,
            stockQuantity: 0,
            minStockLevel: 5,
            categoryId: perifericos.id,
        },
    });

    const teclado = await prisma.product.create({
        data: {
            name: 'Teclado Mecânico Y',
            description: 'Switch blue, RGB',
            sku: 'TEC-001',
            price: 299.9,
            stockQuantity: 0,
            minStockLevel: 3,
            categoryId: perifericos.id,
        },
    });

    const ssd = await prisma.product.create({
        data: {
            name: 'SSD 480GB',
            description: 'SSD SATA III',
            sku: 'SSD-001',
            price: 219.9,
            stockQuantity: 0,
            minStockLevel: 2,
            categoryId: informatica.id,
        },
    });

    // Movimentações de entrada, atualizando o estoque de cada produto
    await prisma.$transaction([
        prisma.stockMovement.create({
            data: {
                type: 'IN',
                quantity: 20,
                reason: 'Estoque inicial',
                productId: mouse.id,
                userId: admin.id,
            },
        }),
        prisma.product.update({
            where: { id: mouse.id },
            data: { stockQuantity: { increment: 20 } },
        }),
    ]);

    await prisma.$transaction([
        prisma.stockMovement.create({
            data: {
                type: 'IN',
                quantity: 10,
                reason: 'Estoque inicial',
                productId: teclado.id,
                userId: admin.id,
            },
        }),
        prisma.product.update({
            where: { id: teclado.id },
            data: { stockQuantity: { increment: 10 } },
        }),
    ]);

    // Esse produto fica com estoque baixo de propósito, pra testar o GET /products/low-stock
    await prisma.$transaction([
        prisma.stockMovement.create({
            data: {
                type: 'IN',
                quantity: 1,
                reason: 'Estoque inicial',
                productId: ssd.id,
                userId: admin.id,
            },
        }),
        prisma.product.update({
            where: { id: ssd.id },
            data: { stockQuantity: { increment: 1 } },
        }),
    ]);

    console.log('Seed concluído com sucesso!');
    console.log(`Admin: admin@estoque.com / senha: admin123`);
}

main()
    .catch((error) => {
        console.error('Erro ao rodar o seed:', error);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
