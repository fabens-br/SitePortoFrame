const { PrismaClient } = require('@prisma/client')

const prisma = new PrismaClient()

async function main() {
  try {
    console.log("Conectando ao banco...")
    await prisma.$connect()
    console.log("Conexão bem sucedida!")
    
    console.log("Testando findFirst (Project)...")
    await prisma.project.findFirst()
    console.log("Project findFirst bem sucedido!")

    console.log("Testando findFirst (Lead)...")
    await prisma.lead.findFirst()
    console.log("Lead findFirst bem sucedido!")

  } catch (e) {
    console.error("Erro capturado:", e)
  } finally {
    await prisma.$disconnect()
  }
}

main()
