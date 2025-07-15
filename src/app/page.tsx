'use client';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { useShorten } from '@/hooks/useShorten';
import { AlertTriangle, Check, CheckCircle2, Clock, Copy, Github, Link as LinkIcon, Shield, Zap } from 'lucide-react';
import NextLink from 'next/link';

export default function Home() {
  const { longUrl, setLongUrl, handleSubmit, codeUrls, message, isLoading, isCopied, copyToClipboard, setMessage } = useShorten();

  const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000/";

  return (
    <div className="min-h-screen w-full overflow-x-hidden bg-[#111014] text-gray-200 antialiased">
      {/* --- Efectos de Fondo Animados (Aurora) --- */}
      <div className="absolute top-0 left-0 w-full h-full z-0 opacity-40">
        <div className="absolute top-[10%] left-[10%] w-[500px] h-[500px] bg-purple-600/30 rounded-full filter blur-[150px] animate-blob"></div>
        <div className="absolute top-[20%] right-[5%] w-[400px] h-[400px] bg-pink-600/30 rounded-full filter blur-[150px] animate-blob animation-delay-2000"></div>
        <div className="absolute bottom-[10%] left-[20%] w-[300px] h-[300px] bg-blue-600/30 rounded-full filter blur-[120px] animate-blob animation-delay-4000"></div>
      </div>

      <div className="relative z-10 flex flex-col min-h-screen">
        {/* --- Header --- */}
        <header className="container mx-auto px-4 sm:px-6 py-5">
          <div className="flex items-center justify-between">
            <NextLink href="/" className="flex items-center space-x-3 group">
              <div className="w-9 h-9 bg-gradient-to-br from-purple-600 to-pink-600 rounded-lg flex items-center justify-center">
                <LinkIcon className="w-5 h-5 text-white" />
              </div>
              <span className="text-2xl font-bold text-white tracking-wider">Rajalo</span>
            </NextLink>

            <div className="hidden md:flex items-center space-x-3">
              <Button variant="ghost" className="cursor-pointer text-gray-300 hover:bg-white/10 hover:text-white">
                Iniciar Sesión
              </Button>
              <Button className="cursor-pointer bg-gradient-to-r from-purple-600 to-pink-600 text-white font-semibold">
                Registrarse
              </Button>
              <Button variant="ghost" size="icon" className="text-gray-300 hover:bg-white/10 hover:text-white" asChild>
                <NextLink href="https://github.com" target="_blank">
                  <Github className="w-5 h-5" />
                </NextLink>
              </Button>
            </div>
            <div className="md:hidden">
              <Button variant="ghost" size="icon" className="text-gray-300 hover:bg-white/10 hover:text-white" asChild>
                <NextLink href="https://github.com" target="_blank">
                  <Github className="w-5 h-5" />
                </NextLink>
              </Button>
            </div>
          </div>
        </header>

        {/* --- Hero Section --- */}
        <main className="flex-grow container mx-auto px-4 sm:px-6 flex flex-col items-center justify-center text-center py-16 md:py-24">
          <div className="animate-fade-in-up">
            <h1 className="text-5xl md:text-7xl lg:text-8xl font-extrabold tracking-tighter bg-gradient-to-br from-white via-gray-300 to-purple-300 bg-clip-text text-transparent mb-6">
              Acorta. Comparte. Domina.
            </h1>
            <p className="text-lg md:text-xl text-gray-400 mb-8 max-w-2xl mx-auto">
              El acortador de enlaces más seguro y rápido del mundo, rediseñado para ti.
            </p>
            <div className="flex flex-wrap justify-center items-center gap-3 md:gap-4 mb-10">
              <Badge className="border-transparent bg-white/10 text-gray-300 py-1 px-3"><Shield className="w-4 h-4 mr-2 text-purple-400" />Seguro</Badge>
              <Badge className="border-transparent bg-white/10 text-gray-300 py-1 px-3"><Zap className="w-4 h-4 mr-2 text-purple-400" />Rápido</Badge>
              <Badge className="border-transparent bg-white/10 text-gray-300 py-1 px-3"><Clock className="w-4 h-4 mr-2 text-purple-400" />Instantáneo</Badge>
            </div>
          </div>

          {/* --- Formulario de Acortador --- */}
          <Card className="w-full max-w-3xl mx-auto bg-white/5 border-white/10 backdrop-blur-lg animate-fade-in-up animation-delay-200">
            <CardContent className="p-5 sm:p-6">
              <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-4">
                <Input
                  type="url"
                  placeholder="Pega tu enlace largo aquí..."
                  value={longUrl}
                  onChange={(e) => {
                    setLongUrl(e.target.value);
                    if (message.type) setMessage({ type: null, text: "" });
                  }}
                  className="flex-1 text-base bg-white/5 border-2 border-white/10 rounded-lg px-4 py-3 text-white placeholder:text-gray-500 focus:border-purple-500 focus:ring-purple-500/50 transition-colors"
                  disabled={isLoading}
                />
                <Button
                  type="submit"
                  disabled={isLoading}
                  className="w-full sm:w-auto text-base font-bold bg-gradient-to-r from-purple-600 to-pink-600 text-white px-8 py-3 rounded-lg cursor-pointer"
                >
                  {isLoading ? "Acortando..." : "Acortar"}
                </Button>
              </form>
            </CardContent>
          </Card>

          {/* --- Mensajes de Estado --- */}
          <div className="h-14 mt-6 flex items-center justify-center">
            {message.type && (
              <div
                className={`flex items-center gap-3 rounded-lg px-4 py-3 text-sm font-medium duration-100 animate-fade-in
                ${message.type === "success" ? "bg-green-500/10 border border-green-500/30 text-green-400" : ""}
                ${message.type === "error" ? "bg-red-500/10 border border-red-500/30 text-red-400" : ""}`}
              >
                {message.type === 'success' && <CheckCircle2 className="h-5 w-5" />}
                {message.type === 'error' && <AlertTriangle className="h-5 w-5" />}
                <span>{message.text}</span>
              </div>
            )}
          </div>

          {/* --- Tabla de Resultados --- */}
          <div className="w-full max-w-6xl mx-auto mt-10 min-h-[300px]">
            {codeUrls.length > 0 && (
              <Card className="bg-white/5 border-white/10 backdrop-blur-lg animate-fade-in-up animation-delay-300">
                <CardContent className="p-4 sm:p-6">
                  <h2 className="text-2xl font-bold text-white mb-6 text-left">Tus Enlaces</h2>
                  <div className="overflow-x-auto">
                    <Table>
                      <TableHeader>
                        <TableRow className="border-b border-white/10 hover:bg-transparent">
                          <TableHead className="text-gray-400">URL Original</TableHead>
                          <TableHead className="text-gray-400">URL Acortada</TableHead>
                          <TableHead className="text-gray-400 hidden sm:table-cell">Fecha</TableHead>
                          <TableHead className="text-right text-gray-400">Copiar</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {codeUrls.map((item) => (
                          <TableRow key={item.id} className="border-b border-white/10 hover:bg-white/5 transition-colors">
                            <TableCell className="max-w-[200px] md:max-w-xs truncate text-gray-300 text-left">
                              {item.longUrl}
                            </TableCell>
                            <TableCell className='text-left text-gray-300'>
                              {BASE_URL + item.codeUrl}
                            </TableCell>
                            <TableCell className="hidden sm:table-cell text-gray-500 font-mono text-sm text-left">{item.createdAt}</TableCell>
                            <TableCell className="text-right">
                              <Button
                                variant="ghost"
                                size="icon"
                                onClick={copyToClipboard}
                                className="text-gray-400 hover:text-white hover:bg-white/10"
                              >
                                {isCopied ? <Check className="w-5 h-5 text-green-400" /> : <Copy className="w-5 h-5" />}
                              </Button>
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </div>
                </CardContent>
              </Card>
            )}
          </div>
        </main>

        {/* --- Footer --- */}
        <footer className="container mx-auto px-4 sm:px-6 text-center py-8 text-gray-500">
          <p>&copy; {new Date().getFullYear()} Rajalo. Creado con pasión.</p>
        </footer>
      </div>
    </div>
  );
}
