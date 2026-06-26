import { useEffect, useRef } from 'react';

/**
 * Executa `handler` sempre que o usuário clica fora do elemento referenciado por `ref`.
 * Útil para fechar dropdowns, modais e menus ao clicar na área externa.
 *
 * @param {React.RefObject} ref - Ref do elemento a ser monitorado
 * @param {Function} handler - Callback executado ao clicar fora
 */
export function useClickOutside(ref, handler) {
  // Mantém o handler atualizado sem re-registrar o event listener a cada render
  const handlerRef = useRef(handler);

  useEffect(() => {
    handlerRef.current = handler;
  });

  useEffect(() => {
    const listener = (event) => {
      if (!ref.current || ref.current.contains(event.target)) return;
      handlerRef.current(event);
    };

    document.addEventListener('mousedown', listener);
    return () => document.removeEventListener('mousedown', listener);
  }, [ref]);
}
