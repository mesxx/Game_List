import React, { useContext, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Spinner } from "flowbite-react";
import * as moment from "moment";
import { GlobalContext } from "../context/GlobalContext";

export default function Detail() {
  const { IdData } = useParams();
  const { state, handleFunction } = useContext(GlobalContext);
  const { data, setData, setCurrentId, currentId } = state;
  const { fetchDetail } = handleFunction;

  useEffect(() => {
    if (IdData !== undefined) {
      fetchDetail();
      setCurrentId(IdData);
    }
    // eslint-disable-next-line
  }, [IdData, setData, setCurrentId, currentId]);

  if (!data) {
    return (
      <div className="grid h-screen place-items-center">
        <Spinner aria-label="Center-aligned spinner example" size="xl" />
      </div>
    );
  }

  return (
    <main className="pt-8 pb-16 lg:pt-16 lg:pb-24 bg-white dark:bg-gray-900">
      <div className="flex justify-between px-4 mx-auto max-w-screen-xl ">
        <article className="mx-auto w-full max-w-2xl format format-sm sm:format-base lg:format-lg format-blue dark:format-invert">
          <header className="mb-4 lg:mb-6 not-format">
            <a href={data.game_url} rel="url">
              <h1 className="underline mb-4 text-3xl font-extrabold  leading-tight text-gray-900 lg:mb-6 lg:text-4xl dark:text-white">
                {data.title}
              </h1>
            </a>
            <address className="flex items-center mb-6 not-italic">
              <div className="inline-flex items-center mr-3 text-sm text-gray-900 dark:text-white">
                <div>
                  <p className="text-base font-light text-gray-500 dark:text-gray-400">
                    {data.publisher}
                  </p>
                  <p className="text-base font-light text-gray-500 dark:text-gray-400">
                    {moment(data.release_date).locale("ID").format("LL")}
                  </p>
                </div>
              </div>
            </address>
          </header>
          <p className="lead">{data.short_description}</p>
          <img className="w-full" src={data.thumbnail} alt="thumbnail" />
          <p>
            First of all you need to understand how Flowbite works. This library
            is not another framework. Rather, it is a set of components based on
            Tailwind CSS that you can just copy-paste from the documentation.
          </p>
        </article>
      </div>
    </main>
  );
}
