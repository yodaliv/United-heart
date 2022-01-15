import React from 'react';
import { Link } from 'react-router-dom';

import { useTranslations } from '../../../hooks/translations';

const NotFound = () => {
  const text = useTranslations('notFound');
  
  return (
    <div className="w-full min-h-content flex flex-col justify-center items-center text-gray-300">
      <h1 className="text-5xl">{text.notFound}</h1>
      <Link className="text-xl text-blue-cornflower font-semibold hover:underline" to="/">{text.goHome}</Link>
    </div>
  );
};

export default NotFound;