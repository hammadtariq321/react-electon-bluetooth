import React from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';

const Index = () => {
  const navigate = useNavigate();

  const { t } = useTranslation();
  return (
    <div className="m-5">
      <h1 className="text-2xl font-medium  text-white">{t('playlists')}</h1>

      <ul className="my-5 cursor-pointer text-white uppercase flex flex-wrap gap-5">
        <li
          className="h-40 w-64 header-gradient p-5 rounded-md"
          onClick={() => navigate('/recently-played')}
        >
          {t('recently-played')} <br />
          {t('frequencies')}
        </li>

        <li className="cursor-pointer" onClick={() => navigate(`/playlist/2`)}>
          <div className="h-20 w-28 bg-red-500 rounded-md"></div>
          <p className="text-sm mt-3">{t('playlist')}</p>
        </li>

        <li className="cursor-pointer" onClick={() => navigate(`/playlist/2`)}>
          <div className="h-20 w-28 bg-yellow-500 rounded-md"></div>
          <p className="text-sm mt-3">{t('playlist')}</p>
        </li>

        <li className="cursor-pointer" onClick={() => navigate(`/playlist/2`)}>
          <div className="h-20 w-28 bg-green-500 rounded-md"></div>
          <p className="text-sm mt-3">{t('playlist')}</p>
        </li>

        <li className="cursor-pointer" onClick={() => navigate(`/playlist/2`)}>
          <div className="h-20 w-28 bg-pink-500 rounded-md"></div>
          <p className="text-sm mt-3">{t('playlist')}</p>
        </li>

        <li className="cursor-pointer" onClick={() => navigate(`/playlist/2`)}>
          <div className="h-20 w-28 bg-purple-500 rounded-md"></div>
          <p className="text-sm mt-3">{t('playlist')}</p>
        </li>

        <li className="cursor-pointer" onClick={() => navigate(`/playlist/2`)}>
          <div className="h-20 w-28 bg-orange-500 rounded-md"></div>
          <p className="text-sm mt-3">{t('playlist')}</p>
        </li>

        <li className="cursor-pointer" onClick={() => navigate(`/playlist/2`)}>
          <div className="h-20 w-28 bg-teal-500 rounded-md"></div>
          <p className="text-sm mt-3">{t('playlist')}</p>
        </li>

        <li className="cursor-pointer" onClick={() => navigate(`/playlist/2`)}>
          <div className="h-20 w-28 bg-gray-500 rounded-md"></div>
          <p className="text-sm mt-3">{t('playlist')}</p>
        </li>

        <li className="cursor-pointer" onClick={() => navigate(`/playlist/2`)}>
          <div className="h-20 w-28 bg-emerald-500 rounded-md"></div>
          <p className="text-sm mt-3">{t('playlist')}</p>
        </li>
      </ul>
    </div>
  );
};

export default Index;
