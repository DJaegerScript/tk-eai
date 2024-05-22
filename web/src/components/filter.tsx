import { ProfessionOptions } from "@/lib/constants";
import { QueryInterface } from "@/lib/model";
import React, { FC } from "react";
import Select from "react-select";

export const Filter: FC<{ setQuery: React.Dispatch<QueryInterface>; query: QueryInterface }> = ({
  query,
  setQuery,
}) => {
  return (
    <section className="grid grid-cols-6 gap-x-8 gap-y-4">
      <div className="col-span-6 flex items-center justify-center">
        <div className="w-full">
          <label className="md:text-lg mb-2 text-gray-200 font-semibold text-center">Nama Pekerjaan</label>
          <input
            className="w-full text-black px-2 py-1"
            onChange={(e) =>
              setQuery({
                ...query,
                title: [e.target.value], 
              })
            }
          />
        </div>
      </div>
      <div className="col-span-3 md:col-span-2">
        <label className="md:text-lg mb-2 text-gray-200 font-semibold" htmlFor="">
          Tanggal Publikasi
        </label>
        <div className="w-full">
          <input
            className="w-full text-black px-2 py-1"
            type="date"
            onChange={(e: any) => {
              console.log(e.target.value);
              setQuery({
                ...query,
                date: e.target.value,
              });
            }}
          />
        </div>
      </div>
      <div className="col-span-3 md:col-span-2">
        <label className="md:text-lg mb-2 text-gray-200 font-semibold">Profesi</label>
        <Select
          instanceId={"profesi"} // Change instanceId to avoid conflicts
          className="text-black "
          options={ProfessionOptions}
          onChange={(selectedOption: any) => {
            setQuery({
              ...query,
              profession: selectedOption.value, // Update title with the selected value
            });
          }}
        />
      </div>
      <div className="col-span-3 md:col-span-1">
        <label className="md:text-lg mb-2 text-gray-200 font-semibold">Lokasi</label>
        <div className="w-full">
          <input
            className="w-full text-black px-2 py-1"
            onChange={(e) =>
              setQuery({
                ...query,
                location: [e.target.value],
              })
            }
          />
        </div>
      </div>
      <div className="col-span-3 md:col-span-1">
        <label className="md:text-lg mb-2 text-gray-200 font-semibold">Perusahaan</label>
        <div className="w-full">
          <input
            className="w-full text-black px-2 py-1"
            onChange={(e) =>
              setQuery({
                ...query,
                company: [e.target.value],
              })
            }
          />
        </div>
      </div>
    </section>
  );
};
