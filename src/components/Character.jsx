import Logo from '../assets/logo-character.svg?react';
import MyTrack from '../assets/mytrack.svg?react';

function Character() {
  return (
    <div className="flex flex-col items-center gap-2">
      <Logo className="w-20 h-20 block" />  {/* ✅ block 추가 */}
      <MyTrack />
    </div>
  );

}

export default Character;
