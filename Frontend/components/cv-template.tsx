/* eslint-disable react/display-name */
import React, { forwardRef } from "react";
import TimeLineElement from "./cv-template-parts/time-line";

const CvTemplate = forwardRef<HTMLDivElement>((props, ref) => {
  return (
    <div ref={ref}>
      <div className="mb-5">
        <div className="text-3xl w-full font-bold">Profile</div>
      </div>
      <div className="mb-10 text-justify">
        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
        tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim
        veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea
        commodo consequat. Duis aute irure dolor in reprehenderit in voluptate
        velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint
        occaecat cupidatat non proident, sunt in culpa qui officia deserunt
        mollit anim id est laborum.
      </div>
      <div className="mb-5">
        <div className="text-3xl w-full font-bold">Education</div>
      </div>
      <div className="time-line-container grid gap-4 mb-10">
        <TimeLineElement
          title="Title Name"
          subtitle="[start year] to [end year] at [Study Center Name], [City], [Country]"
        />
        <TimeLineElement
          title="Title Name"
          subtitle="[start year] to [end year] at [Study Center Name], [City], [Country]"
        />
      </div>
      <div className="mb-5">
        <div className="text-3xl w-full font-bold">Experience</div>
      </div>
      <div className="time-line-container mb-10">
        {/* <TimeLineElement
          title="Job Title at Project or Company Name"
          subtitle="From [Start Date] to [End Date] at [Company], [City], [Country]"
        >
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
          minim veniam, quis nostrud exercitation ullamco laboris nisi ut
          aliquip ex ea commodo consequat. Duis aute irure dolor in
          reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
          pariatur. Excepteur sint occaecat cupidatat non proident.
        </TimeLineElement>
        <TimeLineElement
          title="Job Title at Project or Company Name"
          subtitle="From [Start Date] to [End Date] at [Company], [City], [Country]"
        >
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
          minim veniam, quis nostrud exercitation ullamco laboris nisi ut
          aliquip ex ea commodo consequat. Duis aute irure dolor in
          reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
          pariatur. Excepteur sint occaecat cupidatat non proident.
        </TimeLineElement>
        <TimeLineElement
          title="Job Title at Project or Company Name"
          subtitle="From [Start Date] to [End Date] at [Company], [City], [Country]"
        >
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
          minim veniam, quis nostrud exercitation ullamco laboris nisi ut
          aliquip ex ea commodo consequat. Duis aute irure dolor in
          reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
          pariatur. Excepteur sint occaecat cupidatat non proident.
        </TimeLineElement> */}
      </div>
      <div className="mb-5">
        <div className="text-3xl w-full font-bold">Certifications</div>
      </div>
      <ul className="list-disc mx-6 mb-10 grid gap-2">
        <li>
          <a href="#" target="_blank">
            {" "}
            Certification Name (with link)
          </a>
        </li>
        <li>
          <a href="#" target="_blank">
            {" "}
            Certification Name (with link)
          </a>
        </li>
      </ul>
      <div className="mb-5">
        <div className="text-3xl w-full font-bold">Skills</div>
      </div>
      <ul className="list-disc md:columns-5 columns-2 mx-6">
        <li>Skill Name</li>
        <li>Skill Name</li>
        <li>Skill Name</li>
        <li>Skill Name</li>
        <li>Skill Name</li>
        <li>Skill Name</li>
        <li>Skill Name</li>
        <li>Skill Name</li>
        <li>Skill Name</li>
        <li>Skill Name</li>
        <li>Skill Name</li>
        <li>Skill Name</li>
        <li>Skill Name</li>
        <li>Skill Name</li>
        <li>Skill Name</li>
      </ul>
    </div>
  );
});

export default CvTemplate;
