const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()
async function main() {
  const leads = await prisma.lead.findMany()
  console.log(leads)
}
main()
