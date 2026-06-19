/**
 * ============================================================================
 * @license CORE-ECOSYSTEM & BIOLAB VIRTUAL SYSTEM v3.0
 * @copyright (c) 2026 PhD. Giovanni Alexander Lineros Franco.
 * All Rights Reserved.
 * PROPERTY OF BIOGALF HOME HEALTH S.A.S.
 * * COMPONENTE: Generador de QR Dinámico Rotativo Antifraude (20 segundos)
 * ============================================================================
 */

"use client";
import React, { useEffect, useState } from 'react';
import { QRCodeSVG } from 'qrcode.react';

interface DynamicQRProps {
  idPracticaActual: string;
}

export default function DynamicQRGenerator({ idPracticaActual }: DynamicQRProps) {
  const [urlDinamica, setUrlDinamica] = useState('');
  const [tiempoRestante, setTiempoRestante] = useState(20);
  const [tokenActual, setTokenActual] = useState('');

  useEffect(() => {
    const generarTokenTiempo = () => {
      if (typeof window === 'undefined') return;

      // Estructurar ventana de tiempo de 20 segundos exacta
      const unixTime = Math.floor(Date.now() / 1000);
      const bloqueTiempo = Math.floor(unixTime / 20);
      
      // Crear un hash simple o firma basada en el bloque de tiempo
      const tokenFirma = btoa(`biogalf-${idPracticaActual}-${bloqueTiempo}`).replace(/=/g, '');
      setTokenActual(tokenFirma);

      // Construir la URL base de registro unificado de la PWA
      const baseHost = window.location.origin;
      const urlFinal = `${baseHost}/laboratorio/registro?practica=${idPracticaActual}&token=${tokenFirma}`;
      
      setUrlDinamica(urlFinal);
    };

    // Inicializar primer ciclo
    generarTokenTiempo();

    // Cronómetro de sincronización en tiempo real
    const intervalo = setInterval(() => {
      setTiempoRestante((prev) => {
        if (prev <= 1) {
          generarTokenTiempo(); // Rotar QR e inyectar nuevo token corporativo
          return 20;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(intervalo);
  }, [idPracticaActual]);

  return (
    <div className="bg-slate-950 border-2 border-cyan-500/30 p-6 rounded-3xl flex flex-col items-center justify-center space-y-4 shadow-2xl shadow-cyan-950/20 max-w-sm mx-auto backdrop-blur-md">
      <div className="text-center">
        <span className="text-[9px] font-mono font-black tracking-widest text-cyan-400 uppercase bg-cyan-950/40 border border-cyan-800/50 px-2 py-0.5 rounded-md">
          Control de Presencialidad Física
        </span>
        <h3 className="text-xs font-bold text-white uppercase mt-2">Código de Acceso Dinámico</h3>
      </div>

      {/* CONTENEDOR GLOWING DEL QR */}
      <div className="p-4 bg-white rounded-2xl shadow-[0_0_30px_rgba(6,182,212,0.15)] relative group transition-all">
        {urlDinamica ? (
          <QRCodeSVG 
            value={urlDinamica}
            size={180}
            level="H"
            includeMargin={false}
            imageSettings={{
              src: "/icon.svg",
              x: undefined,
              y: undefined,
              height: 24,
              width: 24,
              excavate: true,
            }}
          />
        ) : (
          <div className="w-[180px] h-[180px] bg-slate-100 rounded-xl flex items-center justify-center text-[10px] text-slate-400 font-mono animate-pulse">
            Sincronizando token...
          </div>
        )}
      </div>

      {/* METADATOS Y TIEMPO RESTANTE */}
      <div className="w-full space-y-2 font-mono text-[10px]">
        <div className="flex justify-between items-center text-slate-400 border-b border-slate-900 pb-1.5">
          <span>Token de Seguridad:</span>
          <span className="text-slate-200 font-bold tracking-wider">{tokenActual.substring(0, 8)}...</span>
        </div>

        <div className="flex justify-between items-center">
          <span className="text-slate-400">Próxima rotación en:</span>
          <span className={`font-bold font-mono px-2 py-0.5 rounded-md ${
            tiempoRestante <= 5 ? 'text-rose-400 bg-rose-950/30 animate-pulse' : 'text-cyan-400 bg-cyan-950/30'
          }`}>
            {tiempoRestante}s
          </span>
        </div>

        {/* BARRA DE PROGRESO DE TIEMPO */}
        <div className="w-full bg-slate-900 h-1 rounded-full overflow-hidden">
          <div 
            className="bg-cyan-500 h-full transition-all duration-1000 ease-linear"
            style={{ width: `${(tiempoRestante / 20) * 100}%` }}
          />
        </div>
      </div>
    </div>
  );
}