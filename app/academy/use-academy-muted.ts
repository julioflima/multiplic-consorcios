"use client";

import { usePersistedState } from "@/lib/use-persisted-state";

/**
 * Preferência de som persistida entre sessões, compartilhada pelo player.
 *
 * Começa com som ligado: abrir uma aula parte de um clique do usuário, que é
 * a interação que o navegador exige pra liberar áudio. Se ainda assim o
 * navegador recusar, o player cai pra mudo sozinho e atualiza este estado.
 *
 * A chave tem sufixo v2 de propósito: o default antigo era "mudo" e ficou
 * gravado no localStorage de quem já usou a Academy — sem trocar a chave,
 * esse valor velho continuaria vencendo o novo default.
 */
export function useAcademyMuted() {
  return usePersistedState<boolean>(["academy", "muted", "v2"], false);
}
