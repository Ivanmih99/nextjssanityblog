"use client"
import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { client } from '../lib/sanity.client';

interface SectionCta {
  _id: string;
  _type: string;
  h1: string;
  button: {
    text: string;
    link: string;
  };
}

function Banner() {
  const [sectionCta, setSectionCta] = useState<SectionCta | null>(null);

  useEffect(() => {
    const fetchSectionCta = async () => {
      try {
        // Fetch 'section-cta' data from Sanity
        const result = await client.fetch('*[_type == "sectionCta"][0]');
        setSectionCta(result);
      } catch (error) {
        console.error('Error fetching section-cta:', error);
      }
    };

    fetchSectionCta();
  }, []);

  return (
    <div className="mb-10 px-10 font-bold lg:flex-row lg:space-x-5">
      {sectionCta && (
        <div className="flex flex-col items-center gap-5">
          <h1 className="text-5xl">{sectionCta.h1}</h1>
          <Link href={sectionCta.button.link}>
              <button className="bg-gray-500 hover:bg-gray-100 shadow-md hover:text-black hover:shadow-lg hover:scale-105 duration-200 text-white w-max font-bold py-2 px-5 rounded-lg">
                {sectionCta.button.text}
              </button>
          </Link>
        </div>
      )}
    </div>
  );
}

export default Banner;