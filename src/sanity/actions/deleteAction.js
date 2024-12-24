import { TrashIcon } from '@sanity/icons';
import { useClient } from 'sanity';

export default function DeleteAction(props) {
  const client = useClient();

  return {
    label: 'Eliminar',
    icon: TrashIcon,
    onHandle: async () => {
      if (window.confirm('¿Estás seguro de que deseas eliminar esta publicación?')) {
        await client.delete(props.id);
        props.onComplete();
      }
    },
  };
}