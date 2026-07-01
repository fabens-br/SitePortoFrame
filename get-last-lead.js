const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()
async function main() {
  const leads = await prisma.lead.findMany({
    orderBy: { created_at: 'desc' },
    take: 1
  })
  console.log("ULTIMO LEAD INSERIDO:", JSON.stringify(leads[0], null, 2))
}
main()
