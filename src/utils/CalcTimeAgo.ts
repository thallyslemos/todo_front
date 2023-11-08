import { formatDistanceToNow } from 'date-fns';
import ptBR from 'date-fns/locale/pt-BR';

function calcTimeAgo(isoDate: string) {
  const timeAgo = formatDistanceToNow(new Date(isoDate), { addSuffix: true, locale: ptBR } );
  return timeAgo;
}

export default calcTimeAgo;