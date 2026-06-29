import { ProjectForm } from "../components/ProjectForm"

export default function NovoProjetoPage() {
  return (
    <div className="mx-auto">
      <ProjectForm isEdit={false} />
    </div>
  )
}
