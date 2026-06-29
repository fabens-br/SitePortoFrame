"use client"

import { usePathname } from "next/navigation"
import { LogOut, LayoutDashboard, Image as ImageIcon, Users, Settings } from "lucide-react"
import Link from "next/link"

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()

  const getPageInfo = () => {
    if (pathname.includes("/projetos/novo")) return { title: "Novo Projeto", subtitle: "Adicionar novo projeto ao portfólio." }
    if (pathname.includes("/projetos/") && pathname.includes("/editar")) return { title: "Editar Projeto", subtitle: "Atualize as informações do projeto." }
    if (pathname.includes("/projetos")) return { title: "Projetos", subtitle: "Gerencie o portfólio da Porto Frame." }
    return { title: "Dashboard", subtitle: "Visão geral do sistema." }
  }

  const { title, subtitle } = getPageInfo()

  return (
    <div className="min-h-screen bg-stone-50 flex font-sans">
      
      {/* Sidebar - Fixa à esquerda */}
      <aside className="w-72 bg-white border-r border-stone-200 flex-col hidden md:flex sticky top-0 h-screen">
        
        {/* Nova Área da Logomarca */}
        <div className="pt-10 pb-8 px-6 flex flex-col items-center justify-center text-center border-b border-stone-100">
          <div className="w-12 h-12 bg-primary rounded-xl flex items-center justify-center mb-4 shadow-sm">
            <span className="text-white font-extrabold text-2xl tracking-tighter">P<span className="opacity-70">F</span></span>
          </div>
          <h1 className="text-xl font-extrabold tracking-tight text-stone-900 leading-none mb-1">
            PORTO FRAME
          </h1>
          <p className="text-xs text-stone-400 font-bold uppercase tracking-widest">
            Backoffice
          </p>
        </div>
        
        <nav className="flex-1 p-6 space-y-2 overflow-y-auto">
          <Link 
            href="/admin" 
            className={`flex items-center gap-3 px-4 py-3 rounded-xl font-semibold transition-all ${
              pathname === "/admin" 
                ? "bg-stone-900 text-white shadow-md shadow-stone-900/10" 
                : "text-stone-500 hover:bg-stone-100 hover:text-stone-900"
            }`}
          >
            <LayoutDashboard size={20} />
            Dashboard
          </Link>
          <Link 
            href="/admin/projetos" 
            className={`flex items-center gap-3 px-4 py-3 rounded-xl font-semibold transition-all ${
              pathname.includes("/projetos") 
                ? "bg-stone-900 text-white shadow-md shadow-stone-900/10" 
                : "text-stone-500 hover:bg-stone-100 hover:text-stone-900"
            }`}
          >
            <ImageIcon size={20} />
            Projetos
          </Link>
          
          <div className="pt-6 mt-6 border-t border-stone-100">
            <p className="px-4 text-[11px] font-bold text-stone-400 uppercase tracking-widest mb-3">Módulos Futuros</p>
            <div className="flex items-center gap-3 px-4 py-3 rounded-xl text-stone-400 opacity-50 font-medium">
              <Users size={20} />
              Clientes
            </div>
            <div className="flex items-center gap-3 px-4 py-3 rounded-xl text-stone-400 opacity-50 font-medium">
              <Settings size={20} />
              Configurações
            </div>
          </div>
        </nav>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 flex flex-col min-h-screen relative">
        
        {/* Topbar Administrativa Exclusiva */}
        <header className="sticky top-0 z-40 bg-white/80 backdrop-blur-xl border-b border-stone-200 px-8 py-5 flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-extrabold text-stone-900 tracking-tight">{title}</h2>
            <p className="text-sm font-medium text-stone-500 mt-1">{subtitle}</p>
          </div>
          
          <div className="flex flex-col items-end">
            <span className="text-sm font-bold text-stone-900">Usuário Admin</span>
            <form action="/api/auth/logout" method="POST" className="mt-1">
              <button type="submit" className="flex items-center gap-1.5 text-xs font-semibold text-red-500 hover:text-red-700 transition-colors">
                <LogOut size={14} />
                Logout
              </button>
            </form>
          </div>
        </header>
        
        {/* Mobile Header (fallback) */}
        <div className="md:hidden bg-stone-900 text-white p-4 flex justify-between items-center">
          <div className="font-bold tracking-tight">PORTO FRAME</div>
          <form action="/api/auth/logout" method="POST">
            <button type="submit" className="p-2 text-white/70 hover:text-white">
              <LogOut size={20} />
            </button>
          </form>
        </div>

        {/* Page Content */}
        <div className="flex-1 p-8">
          {children}
        </div>
      </main>
      
    </div>
  )
}
