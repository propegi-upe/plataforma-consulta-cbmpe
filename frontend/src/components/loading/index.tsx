interface Props {}

const Loading: React.FC<Props> = ({}) => {
  return (
    <div className="flex items-center justify-center h-screen flex-col ">
      <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-primary"></div>
    </div>
  );
};

export { Loading };
