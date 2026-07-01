import { Metadata } from "next"
import prisma from "@/lib/prisma"
import { list } from "@vercel/blob"
import { Database, Image as ImageIcon, Server, LayoutDashboard, Activity } from "lucide-react"

export const metadata: Metadata = {
  title: "Diagnóstico do Sistema | Admin",
}

export const dynamic = "force-dynamic";

export default async function SystemDiagnosticsPage() {
  const startTime = Date.now();
  
  // 1. Check MongoDB & Prisma
  let mongoStatus = "OK";
  let totalProjects = 0;
  let totalImagesDB = 0;
  let lastProject = null;

  try {
    totalProjects = await prisma.project.count();
    totalImagesDB = await prisma.projectImage.count();
    lastProject = await prisma.project.findFirst({
      orderBy: { created_at: 'desc' }
    });
  } catch {
    mongoStatus = "FALHA";
  }

  // 2. Check Vercel Blob
  let blobStatus = "OK";
  let totalBlobs = 0;
  let totalBlobSize = 0;
  
  try {
    const { blobs } = await list();
    totalBlobs = blobs.length;
    totalBlobSize = blobs.reduce((acc, curr) => acc + curr.size, 0);
  } catch {
    blobStatus = "FALHA";
  }

  const envs = {
    DATABASE_URL: process.env.DATABASE_URL ? "OK" : "AUSENTE",
    BLOB_READ_WRITE_TOKEN: process.env.BLOB_READ_WRITE_TOKEN ? "OK" : "AUSENTE"
  };

  const loadTime = Date.now() - startTime;

  return (
    <div className="p-8 max-w-6xl mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-bold flex items-center gap-3">
          <Activity className="text-primary" />
          Diagnóstico do Sistema
        </h1>
        <p className="text-muted-foreground mt-2">Visão geral da infraestrutura e serviços conectados.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
        {/* Status Cards */}
        <div className="bg-white p-6 rounded-2xl border border-stone-200 shadow-sm flex flex-col gap-2">
          <div className="flex items-center gap-3 text-stone-500 font-semibold mb-2">
            <Database size={20} /> MongoDB Atlas
          </div>
          <div className="text-2xl font-bold">{mongoStatus}</div>
          <div className="text-sm text-stone-400">Via Prisma ORM</div>
        </div>

        <div className="bg-white p-6 rounded-2xl border border-stone-200 shadow-sm flex flex-col gap-2">
          <div className="flex items-center gap-3 text-stone-500 font-semibold mb-2">
            <Server size={20} /> Vercel Blob
          </div>
          <div className="text-2xl font-bold">{blobStatus}</div>
          <div className="text-sm text-stone-400">Armazenamento de Imagens</div>
        </div>

        <div className="bg-white p-6 rounded-2xl border border-stone-200 shadow-sm flex flex-col gap-2">
          <div className="flex items-center gap-3 text-stone-500 font-semibold mb-2">
            <LayoutDashboard size={20} /> API Tempo
          </div>
          <div className="text-2xl font-bold">{loadTime}ms</div>
          <div className="text-sm text-stone-400">Tempo de resposta da verificação</div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Métricas */}
        <div className="bg-white p-8 rounded-3xl border border-stone-200 shadow-sm">
          <h2 className="text-xl font-bold mb-6 flex items-center gap-2">
            <ImageIcon className="text-primary" size={24} />
            Métricas de Projetos
          </h2>
          <div className="space-y-4">
            <div className="flex justify-between py-3 border-b border-stone-100">
              <span className="text-stone-600">Total de Projetos</span>
              <span className="font-bold">{totalProjects}</span>
            </div>
            <div className="flex justify-between py-3 border-b border-stone-100">
              <span className="text-stone-600">Total de Imagens (Banco)</span>
              <span className="font-bold">{totalImagesDB}</span>
            </div>
            <div className="flex justify-between py-3 border-b border-stone-100">
              <span className="text-stone-600">Total de Arquivos (Blob)</span>
              <span className="font-bold">{totalBlobs}</span>
            </div>
            <div className="flex justify-between py-3 border-b border-stone-100">
              <span className="text-stone-600">Espaço Utilizado (Blob)</span>
              <span className="font-bold">{(totalBlobSize / 1024 / 1024).toFixed(2)} MB</span>
            </div>
            <div className="flex justify-between py-3">
              <span className="text-stone-600">Último Projeto Criado</span>
              <span className="font-bold text-right">
                {lastProject ? new Date(lastProject.created_at).toLocaleString('pt-BR') : 'Nenhum'}
              </span>
            </div>
          </div>
        </div>

        {/* Variáveis de Ambiente */}
        <div className="bg-white p-8 rounded-3xl border border-stone-200 shadow-sm">
          <h2 className="text-xl font-bold mb-6 flex items-center gap-2">
            <Server className="text-primary" size={24} />
            Variáveis e Ambiente
          </h2>
          <div className="space-y-4">
            <div className="flex justify-between items-center py-3 border-b border-stone-100">
              <span className="text-stone-600 font-mono text-sm">DATABASE_URL</span>
              <span className={`px-3 py-1 rounded-full text-xs font-bold ${envs.DATABASE_URL === 'OK' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
                {envs.DATABASE_URL}
              </span>
            </div>
            <div className="flex justify-between items-center py-3 border-b border-stone-100">
              <span className="text-stone-600 font-mono text-sm">BLOB_READ_WRITE_TOKEN</span>
              <span className={`px-3 py-1 rounded-full text-xs font-bold ${envs.BLOB_READ_WRITE_TOKEN === 'OK' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
                {envs.BLOB_READ_WRITE_TOKEN}
              </span>
            </div>
            <div className="flex justify-between items-center py-3 border-b border-stone-100">
              <span className="text-stone-600">Ambiente Atual</span>
              <span className="font-bold text-sm uppercase">
                {process.env.NODE_ENV}
              </span>
            </div>
            <div className="flex justify-between items-center py-3 border-b border-stone-100">
              <span className="text-stone-600">Framework</span>
              <span className="font-bold text-sm">Next.js 15 (App Router)</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
