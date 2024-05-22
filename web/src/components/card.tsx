import { JobPostingAttributes } from '@/lib/model';
import { FC } from 'react';

export const Card: FC<JobPostingAttributes> = ({
  profession,
  company,
  location,
  source,
  title,
  url,
  date,
}) => {
  return (
    <div className='card-container'>
      <div className='card'>
        <a className='card1' href={url}>
          <span className='badge badge-light'>{profession}</span>{' '}
          <p className='title font-semibold mt-2'>{title}</p>
          <p className='small'>
            Perusahaan : <span>{company}</span>
          </p>
          <p className='small'>
            Lokasi : <span>{location}</span>
          </p>
          <p className='small'>
            Tanggal Publikasi :{' '}
            <span>{new Date(date || Date.now()).toLocaleDateString()}</span>
          </p>
          <p className='small'>
            Sumber : <span>{source}</span>
          </p>
          <a className='go-corner' href={url}>
            <div className='go-arrow'>→</div>
          </a>
        </a>
      </div>
    </div>
  );
};
