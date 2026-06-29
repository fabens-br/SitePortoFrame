import { redirect } from "next/navigation"

export default function AdminPage() {
  // Redireciona imediatamente para a listagem de projetos (módulo padrão)
  redirect("/admin/projetos")
}
