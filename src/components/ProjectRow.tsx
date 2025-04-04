'use client';

import React from 'react';
import ProjectCard from './ProjectCard';

// Define the project item structure
export interface ProjectItem {
  imageSrc: string;
  title: string;
  subtitle?: string;
  description?: string;
}

// Define the props for the ProjectRow component
export interface ProjectRowProps {
  projects: ProjectItem[];
  largeCardFirst?: boolean;
  splitSmallSection?: boolean;
  className?: string;
}

export default function ProjectRow({
  projects,
  largeCardFirst = true,
  splitSmallSection = false,
  className = '',
}: ProjectRowProps) {
  // Make sure we have the right number of projects
  if (splitSmallSection && projects.length < 3) {
    console.error(
      'When splitSmallSection is true, at least 3 projects are required'
    );
    return null;
  }

  if (!splitSmallSection && projects.length < 2) {
    console.error(
      'When splitSmallSection is false, at least 2 projects are required'
    );
    return null;
  }

  // Render the row with large card first
  if (largeCardFirst) {
    return (
      <div className={`grid grid-cols-3 gap-6 ${className}`}>
        <div className="col-span-2 h-[400px]">
          <ProjectCard
            imageSrc={projects[0].imageSrc}
            title={projects[0].title}
            subtitle={projects[0].subtitle}
            description={projects[0].description}
            isLarge
            className="h-full"
          />
        </div>

        <div
          className={`col-span-1 ${
            splitSmallSection ? 'grid grid-rows-2 gap-6' : ''
          } h-[400px]`}
        >
          {splitSmallSection ? (
            <>
              <ProjectCard
                imageSrc={projects[1].imageSrc}
                title={projects[1].title}
                subtitle={projects[1].subtitle}
                description={projects[1].description}
                className="h-full"
              />
              <ProjectCard
                imageSrc={projects[2].imageSrc}
                title={projects[2].title}
                subtitle={projects[2].subtitle}
                description={projects[2].description}
                className="h-full"
              />
            </>
          ) : (
            <ProjectCard
              imageSrc={projects[1].imageSrc}
              title={projects[1].title}
              subtitle={projects[1].subtitle}
              description={projects[1].description}
              gridRowSpan
              className="h-full"
            />
          )}
        </div>
      </div>
    );
  }

  // Render the row with small card first
  return (
    <div className={`grid grid-cols-3 gap-6 ${className}`}>
      <div
        className={`col-span-1 ${
          splitSmallSection ? 'grid grid-rows-2 gap-6' : ''
        } h-[400px]`}
      >
        {splitSmallSection ? (
          <>
            <ProjectCard
              imageSrc={projects[0].imageSrc}
              title={projects[0].title}
              subtitle={projects[0].subtitle}
              description={projects[0].description}
              className="h-full"
            />
            <ProjectCard
              imageSrc={projects[1].imageSrc}
              title={projects[1].title}
              subtitle={projects[1].subtitle}
              description={projects[1].description}
              className="h-full"
            />
          </>
        ) : (
          <ProjectCard
            imageSrc={projects[0].imageSrc}
            title={projects[0].title}
            subtitle={projects[0].subtitle}
            description={projects[0].description}
            gridRowSpan
            className="h-full"
          />
        )}
      </div>

      <div className="col-span-2 h-[400px]">
        <ProjectCard
          imageSrc={
            splitSmallSection ? projects[2].imageSrc : projects[1].imageSrc
          }
          title={splitSmallSection ? projects[2].title : projects[1].title}
          subtitle={
            splitSmallSection ? projects[2].subtitle : projects[1].subtitle
          }
          description={
            splitSmallSection
              ? projects[2].description
              : projects[1].description
          }
          isLarge
          className="h-full"
        />
      </div>
    </div>
  );
}
