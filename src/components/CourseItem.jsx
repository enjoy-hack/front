const CourseItem = ({ name, year, semester, code, status }) => {
  return (
    <div className="bg-white rounded-lg p-4 flex items-center justify-between">
      <p className="font-bold text-base">{name}</p>
      <div className="grid grid-cols-4 gap-2 min-w-[240px] text-sm text-[#0259DD] place-items-center text-center">
        <span>{year}</span>
        <span>{semester}</span>
        <span>{code}</span>
        <span
          className={`w-16 px-2 py-1 rounded-lg text-xs font-semibold text-white ${
            status === '이수' ? 'bg-[#84AFFB]' : 'bg-[#D9D9D9]'
          }`}
        >
          {status}
        </span>
      </div>
    </div>
  );
};

export default CourseItem;
