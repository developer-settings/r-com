import { cn } from '@/lib/utils';

type TextGradientProps = {
  children: string;
  from?: string;
  via?: string;
  to?: string;
  classname?: string;
};

export default function TextGradient(props: TextGradientProps) {
  const from = props.from || 'from-orange-700';
  const via = props.via || 'via-blue-500';
  const to = props.to || 'to-green-400';

  return (
    <span
      className={cn(
        `bg-gradient-to-r ${from} ${via} ${to} text-transparent bg-clip-text bg-300% animate-gradient`,
        props.classname
      )}>
      {props.children}
    </span>
  );
}
