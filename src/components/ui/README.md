# Componentes UI

## Button

Componente de botão genérico e reutilizável com múltiplas variantes e tamanhos.

### Uso

```tsx
import { Button } from '@/components/ui';
import { FaBolt } from 'react-icons/fa';

// Botão básico
<Button>Clique aqui</Button>

// Com variantes
<Button variant="primary">Primário</Button>
<Button variant="secondary">Secundário</Button>
<Button variant="outline">Outline</Button>
<Button variant="danger">Perigo</Button>
<Button variant="success">Sucesso</Button>

// Com tamanhos
<Button size="small">Pequeno</Button>
<Button size="medium">Médio</Button>
<Button size="large">Grande</Button>

// Largura total
<Button fullWidth>Largura Total</Button>

// Com ícones
<Button leftIcon={<FaBolt />}>Com ícone à esquerda</Button>
<Button rightIcon={<FaBolt />}>Com ícone à direita</Button>

// Estado de carregamento
<Button isLoading>Carregando...</Button>

// Desabilitado
<Button disabled>Desabilitado</Button>
```

### Props

| Prop | Tipo | Padrão | Descrição |
|------|------|--------|-----------|
| `variant` | `'primary' \| 'secondary' \| 'outline' \| 'danger' \| 'success'` | `'primary'` | Variante do botão |
| `size` | `'small' \| 'medium' \| 'large'` | `'medium'` | Tamanho do botão |
| `fullWidth` | `boolean` | `false` | Se o botão deve ocupar toda a largura |
| `isLoading` | `boolean` | `false` | Mostra um spinner de carregamento |
| `leftIcon` | `ReactNode` | - | Ícone à esquerda do texto |
| `rightIcon` | `ReactNode` | - | Ícone à direita do texto |
| `disabled` | `boolean` | `false` | Desabilita o botão |

Além dessas props, o componente aceita todas as props padrão de um elemento `<button>`.

