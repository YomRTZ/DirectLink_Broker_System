import { Button, Toast } from "flowbite-react";
import { MdLoop } from "react-icons/md";
import { useNavigate } from 'react-router-dom';
export function PopOver() {
   const navigate = useNavigate();
  return (
    <Toast>
      <div className="flex items-start">
        <div className="ml-3 text-sm font-normal">
          <span className="mb-1 text-sm font-semibold text-gray-900 dark:text-white">DirectLink</span>
          <div className="mb-2 text-sm font-normal">To help owner get to know you better, kindly fill your personal information before contact them.</div>
          <div className="flex gap-2">
            <div className="w-auto">
              <Button onClick={() => navigate('/profile')} color="light" size="xs">
               Go to Profile
              </Button>
            </div>
          </div>
        </div>
        <Toast.Toggle />
      </div>
    </Toast>
  );
}
