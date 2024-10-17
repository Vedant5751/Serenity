import React from "react";

export default function About() {
  return (
    <>
      <section className="py-24 relative">
        <div className="w-full max-w-7xl px-4 md:px-5 lg:px-5 mx-auto">
          <div className="w-full justify-start items-center gap-12 grid lg:grid-cols-2 grid-cols-1">
            <div className="w-full justify-center items-start gap-6 grid sm:grid-cols-2 grid-cols-1 lg:order-first order-last">
              <div className="pt-24 lg:justify-center sm:justify-end justify-start items-start gap-2.5 flex">
                <img
                  className="rounded-xl object-cover"
                  src=""
                  alt="About Serenity"
                />
              </div>
              <img
                className="sm:ml-0 ml-auto rounded-xl object-cover"
                src=""
                alt="Mental Health Support"
              />
            </div>
            <div className="w-full flex-col justify-center lg:items-start items-center gap-10 inline-flex">
              <div className="w-full flex-col justify-center items-start gap-8 flex">
                <div className="w-full flex-col justify-start lg:items-start items-center gap-3 flex">
                  <h2 className="text-gray-900 dark:text-gray-100 text-4xl font-bold font-manrope leading-normal lg:text-start text-center">
                    Welcome to Serenity: Your Mental Health Companion
                  </h2>
                  <p className="text-gray-500 dark:text-gray-400 text-base font-normal leading-relaxed lg:text-start text-center">
                    Serenity is designed to support your mental well-being by
                    providing a safe space for mood tracking, virtual therapy
                    sessions, support groups, and an extensive resource library.
                    Our goal is to empower you to prioritize your mental health
                    and foster a positive journey of self-care.
                  </p>
                </div>
                <div className="w-full lg:justify-start justify-center items-center sm:gap-10 gap-5 inline-flex">
                  <div className="flex-col justify-start items-start inline-flex">
                    <h3 className="text-gray-900 dark:text-gray-100 text-4xl font-bold font-manrope leading-normal">
                      24/7
                    </h3>
                    <h6 className="text-gray-500 dark:text-gray-400 text-base font-normal leading-relaxed">
                      Accessible Support
                    </h6>
                  </div>
                  <div className="flex-col justify-start items-start inline-flex">
                    <h4 className="text-gray-900 dark:text-gray-100 text-4xl font-bold font-manrope leading-normal">
                      100+
                    </h4>
                    <h6 className="text-gray-500 dark:text-gray-400 text-base font-normal leading-relaxed">
                      Resources
                    </h6>
                  </div>
                  <div className="flex-col justify-start items-start inline-flex">
                    <h4 className="text-gray-900 dark:text-gray-100 text-4xl font-bold font-manrope leading-normal">
                      50+
                    </h4>
                    <h6 className="text-gray-500 dark:text-gray-400 text-base font-normal leading-relaxed">
                      Therapists Onboard
                    </h6>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-24 relative">
        <div className="w-full max-w-7xl px-4 md:px-5 lg:px-5 mx-auto">
          <div className="w-full justify-start items-center gap-8 grid lg:grid-cols-2 grid-cols-1">
            <div className="w-full flex-col justify-start lg:items-start items-center gap-10 inline-flex">
              <div className="w-full flex-col justify-start lg:items-start items-center gap-4 flex">
                <h2 className="text-gray-900 dark:text-gray-100 text-4xl font-bold font-manrope leading-normal lg:text-start text-center">
                  Comprehensive Mental Health Resources
                </h2>
                <p className="text-gray-500 dark:text-gray-400 text-base font-normal leading-relaxed lg:text-start text-center">
                  Serenity offers a wide range of resources including articles,
                  podcasts, and videos to help you better understand mental
                  health challenges, develop coping strategies, and stay
                  informed about the latest therapies and treatments.
                </p>
              </div>
            </div>
            <img
              className="lg:mx-0 mx-auto h-full rounded-3xl object-cover"
              src=""
              alt="Mental Health Resources"
            />
          </div>
        </div>
      </section>

      <section className="py-24 relative">
        <div className="w-full max-w-7xl px-4 md:px-5 lg:px-5 mx-auto">
          <div className="w-full justify-start items-center gap-8 grid lg:grid-cols-2 grid-cols-1">
            <div className="w-full flex-col justify-start lg:items-start items-center gap-10 inline-flex">
              <div className="w-full flex-col justify-start lg:items-start items-center gap-4 flex">
                <h2 className="text-gray-900 dark:text-gray-100 text-4xl font-bold font-manrope leading-normal lg:text-start text-center">
                  Virtual Therapy and Support Groups
                </h2>
                <p className="text-gray-500 dark:text-gray-400 text-base font-normal leading-relaxed lg:text-start text-center">
                  Serenity connects you with licensed therapists for virtual
                  therapy sessions and offers peer-led support groups where you
                  can share your experiences and receive guidance from others
                  who understand your journey.
                </p>
              </div>
            </div>
            <img
              className="lg:mx-0 mx-auto h-full rounded-3xl object-cover"
              src=""
              alt="Virtual Therapy"
            />
          </div>
        </div>
      </section>
    </>
  );
}
