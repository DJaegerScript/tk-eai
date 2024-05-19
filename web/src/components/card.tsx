import { JobPostingAttributes } from "@/lib/model";
import { FC } from "react";

export const Card: FC<JobPostingAttributes> = ({ profession, company, location, source, title, url, date }) => {
  return (
    <a href={url} target="_blank" className="rounded-lg bg-gray-700 border border-gray-600 px-4 py-2 text-sm block">
      <div>
        <h4 className="text-lg">{title}</h4>
        <h6 className="">{profession}</h6>
        <h6 className="">{company}</h6>
        <div className="border-b border-gray-600 w-full" />
        <p>
          Lokasi : <span>{location}</span>
        </p>
        <p>
          Sumber : <span>{source}</span>
        </p>
        {date && (
          <p>
            Tanggal Publikasi : <span>{new Date(date).toLocaleDateString()}</span>
          </p>
        )}
      </div>
    </a>
  );
};
