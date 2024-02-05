type Props = {
  score: number;
};

export function NewsScore(props: Props) {
  return (
    <div className="text-xl rounded-lg p-4 border border-[#7424DA66] bg-[#FAF6FF]">
      News score: <strong className="font-semibold">{props.score}</strong>
    </div>
  );
}
