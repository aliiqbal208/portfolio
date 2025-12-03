"use client"
import styles from "./root.module.css"
import Image from "next/image"
import {
  ArrowUpRight,
  ChevronLeft,
  ChevronRight,
  CircleUserRound,
  Github,
  Linkedin,
  Mail,
  Moon,
  Rss,
  Sun,
  Briefcase,
  Award,
} from "lucide-react"
import { Marquee } from "@/components/magicui/marquee"
import { useTheme } from "next-themes"
import ProjectCard from "@/components/projectCard/projectCard"
import type { BlogType, ProjectType } from "@/lib/types"
import { motion, useScroll, useMotionValueEvent } from "framer-motion"
import DefaultBlogCard from "@/components/blogs/blogCards"
import Link from "next/link"
import { useState, useEffect } from "react"
import cn from "classnames"
import GitHubContributions from "@/components/github-contributions"
import ExperienceSection from "@/components/experience-section"
import { PoweredBy } from "@/components/powered-by"

export default function RotPage() {
  // Fetch projects from GitHub Gist or local JSON
  const [projectsList, setProjectsList] = useState<ProjectType[]>([])
  const [isLoadingProjects, setIsLoadingProjects] = useState(true)

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const IS_LOCAL = process.env.NEXT_PUBLIC_IS_LOCAL_JSON === 'true'
        
        if (IS_LOCAL) {
          // Load from local JSON file
          const response = await fetch('/data/projects.json')
          if (response.ok) {
            const data = await response.json()
            setProjectsList(data)
            console.log('✅ Projects loaded from local JSON')
          } else {
            console.error('Failed to fetch projects from local JSON')
          }
        } else {
          // Load from GitHub Gist
          const GIST_ID = process.env.NEXT_PUBLIC_PROJECTS_GIST_ID
          if (!GIST_ID) {
            console.error('GIST_ID not configured')
            setIsLoadingProjects(false)
            return
          }
          
          const response = await fetch(
            `https://gist.githubusercontent.com/aliiqbal208/${GIST_ID}/raw`
          )
          
          if (response.ok) {
            const data = await response.json()
            setProjectsList(data)
            console.log('✅ Projects loaded from GitHub Gist')
          } else {
            console.error('Failed to fetch projects from Gist')
          }
        }
      } catch (error) {
        console.error('Error fetching projects:', error)
      } finally {
        setIsLoadingProjects(false)
      }
    }
    
    fetchProjects()
  }, [])

  const [projectDisplayList, setProjectDisplayList] = useState<ProjectType[]>([])
  const [showMoreProject, setShowMoreProject] = useState("less")

  // Update display list when projectsList changes
  useEffect(() => {
    if (projectsList.length > 0) {
      setProjectDisplayList(projectsList.slice(0, 3))
    }
  }, [projectsList])

  // Frontend & Languages Row
  const techStack1 = [
    {
      name: "TypeScript",
      iconUrl: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg",
    },
    {
      name: "React",
      iconUrl: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg",
    },
    {
      name: "Next.js",
      iconUrl: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nextjs/nextjs-original.svg",
    },
    {
      name: "Angular",
      iconUrl: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/angularjs/angularjs-original.svg",
    },
    {
      name: "Tailwind CSS",
      iconUrl: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/tailwindcss/tailwindcss-original.svg",
    },
    {
      name: "Redux",
      iconUrl: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/redux/redux-original.svg",
    },
    {
      name: "shadCn UI",
      iconUrl: "https://ui.shadcn.com/favicon.ico",
    },
    {
      name: "Python",
      iconUrl: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg",
    },
    {
      name: "Golang",
      iconUrl: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/go/go-original.svg",
    },
  ]
  
  // Backend, Cloud & Infrastructure Row
  const techStack2 = [
    {
      name: "Node.js",
      iconUrl: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg",
    },
    {
      name: "Express",
      iconUrl: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/express/express-original.svg",
    },
    {
      name: "FastAPI",
      iconUrl: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/fastapi/fastapi-original.svg",
    },
    {
      name: "Flask",
      iconUrl: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/flask/flask-original.svg",
    },
    {
      name: "PostgreSQL",
      iconUrl: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/postgresql/postgresql-original.svg",
    },
    {
      name: "MongoDB",
      iconUrl: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mongodb/mongodb-original.svg",
    },
    {
      name: "Redis",
      iconUrl: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/redis/redis-original.svg",
    },
    {
      name: "AWS",
      iconUrl: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/amazonwebservices/amazonwebservices-original-wordmark.svg",
    },
    {
      name: "Docker",
      iconUrl: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/docker/docker-original.svg",
    },
    {
      name: "Kubernetes",
      iconUrl: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/kubernetes/kubernetes-plain.svg",
    },
    {
      name: "Terraform",
      iconUrl: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/terraform/terraform-original.svg",
    },
    {
      name: "GitHub Actions",
      iconUrl: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/github/github-original.svg",
    },
    {
      name: "Git",
      iconUrl: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/git/git-original.svg",
    },
  ]

  const { theme: currentTheme, setTheme: setCurrentTheme } = useTheme()
  const [isScrolled, setIsScrolled] = useState(false)
  const { scrollY } = useScroll()

  useMotionValueEvent(scrollY, "change", (latest) => {
    setIsScrolled(latest > 140)
  })

  const [displayTab, setDisplayTab] = useState("info")

  const [blogsArray, setBlogsArray] = useState<BlogType[] | null>(null)
  useEffect(() => {
    const a = async () => {
      const res = await fetch("/api/getBlogs")
      if (res.ok) {
        const blogsArray = await res.json()
        setBlogsArray(blogsArray)
        console.log("blogs: ", blogsArray)
      }
    }
    a()
  }, [])

  const certifications = [
    {
      title: "Robotics: Aerial Robotics",
      issuer: "UPenn | 2024",
      imageUrl: "/images/upenn1.jpg",
      proofUrl: "https://coursera.org/share/9e3d0e1d3e8d58dc42e731177e6388f1",
      summary: "MATLAB and Simulation Software, Control System, Mathematical Modeling with Calculus.",
    },
    {
      title: "Robotics: Computational Motion Planning",
      issuer: "UPenn | 2024",
      imageUrl: "/images/upenn.jpg",
      proofUrl: "https://coursera.org/share/f72546c95773fe47de79922ddf5c4693",
      summary: "Graph Theory and Computational Logic, MATLAB and Network Routing, Computational Thinking with AI.",
    },
    {
      title: "Robotic Process Automation",
      issuer: "UiPath | 2024",
      imageUrl: "/images/uipath.jpg",
      proofUrl: "https://coursera.org/share/f82b4a523d8a2ffdaf25008475f943d1",
      summary: "UiRPA, Web Scraping and Data Manipulation, UI and UI Components, Test Automation.",
    },
  ]

  return (
    <div className={styles.main}>
      <div
        className={cn(
          "z-[-1]",
          "absolute inset-0",
          "[background-size:20px_20px]",
          "[background-image:radial-gradient(var(--fgColor)_1px,transparent_1px)]",
          "dark:[background-image:radial-gradient(var(--fgColor)_1px,transparent_1px)]",
          "[opacity:0.25]",
          "transition-colors duration-400",
        )}
      />
      <div className="z-[-1] pointer-events-none absolute inset-0 flex items-center justify-center bg-[var(--bgColor)] [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)] dark:bg-[var(--bgColor)] transition-colors duration-400"></div>

      <div className={styles.detailsHolder}>
        <div className={styles.heroSection}>
          <motion.div
            style={{
              transition: "all 0.1s ease",
              zIndex: 10,
              maxWidth: 650,
              width: "100%",
              borderRadius: "0px 0px 10px 10px",
            }}
            animate={isScrolled ? "scrolled" : "normal"}
            variants={{
              normal: { position: "static" },
              scrolled: { top: 0, position: "fixed", height: 60, backdropFilter: "blur(10px)" },
            }}
          >
            <motion.div className="relative h-[100%] w-[100%] flex items-center justify-end px-[15px]">
              <motion.img
                src="https://res.cloudinary.com/daeki8yrd/image/upload/v1764752508/profile-ali_wr8lrq.png"
                alt="Profile photo of Muhammad Ali"
                initial={{ height: 200, width: 200, borderRadius: 9999, margin: "0px auto", position: "static" }}
                animate={isScrolled ? "scrolled" : "normal"}
                variants={{
                  normal: { height: 200, width: 200, borderRadius: 9999 },
                  scrolled: { height: 40, width: 40, borderRadius: 9999, position: "absolute", top: 10, left: 10 },
                }}
                whileHover={{ boxShadow: "0 0 30px 2px rgba(255, 255, 255, 0.5)" }}
                transition={{ type: "spring", stiffness: 300, damping: 20 }}
                style={{ objectFit: "cover", transition: "box-shadow 0.1s" }}
              />
            </motion.div>
          </motion.div>

          <div className="flex flex-col items-center gap-[2px]">
            <h1 className="font-mono font-semibold leading-10 text-3xl">Muhammad Ali</h1>
            <p className={styles.SWEpara}>Senior Full-Stack AI Engineer</p>
          </div>

          <div className={styles.socialsDiv}>
            <Link href="https://x.com/aliiqbal208" target="_blank">
              <div className={styles.socialsItem}>
                <Image height={15} width={15} alt="" src="/x-social-media-white-icon.svg" unoptimized />
                <p>X app</p>
              </div>
            </Link>

            <Link href="https://github.com/aliiqbal208" target="_blank">
              <div className={styles.socialsItem}>
                <Github size={15} color="white" />
                <p>Github</p>
              </div>
            </Link>

            <Link href="https://authzed.com/" target="_blank">
              <div className={styles.socialsItem}>
                <Image alt="Authzed" src="/authzed.png" width={15} height={15} unoptimized />
                <p>Authzed</p>
              </div>
            </Link>

            <Link href="mailto:codewithmuhammadali@gmail.com" target="_blank">
              <div className={styles.socialsItem}>
                <Mail size={15} color="white" />
                <p>Mail</p>
              </div>
            </Link>

            <Link href="https://www.linkedin.com/in/aliiqbal208/" target="_blank">
              <div className={styles.socialsItem}>
                <Linkedin size={15} color="white" />
                <p>LinkedIn</p>
              </div>
            </Link>

            <button
              type="button"
              className={styles.socialsItem}
              onClick={() => setCurrentTheme(currentTheme === "dark" ? "light" : "dark")}
              aria-label="Toggle color theme"
            >
              {currentTheme === "dark" ? <Sun size={15} /> : <Moon size={15} />}
              <p>Theme</p>
            </button>
          </div>
        </div>

        <div className={styles.bio}>
          <p className="font-mono tracking-tighter underline leading-7 font-light text-2xl">Lahore, Pakistan 🇵🇰</p>
        </div>

        <div className={styles.tabsHolder}>
          <div
            className={`${styles.tabItem} ${displayTab == "info" && styles.tabItemActive}`}
            onClick={() => {
              setDisplayTab("info")
            }}
          >
            Info
            <div className={styles.hoverThing} />
          </div>
          <div
            className={`${styles.tabItem} ${displayTab == "experience" && styles.tabItemActive}`}
            onClick={() => {
              setDisplayTab("experience")
            }}
          >
            Experience
            <div className={styles.hoverThing} />
          </div>
          <div
            className={`${styles.tabItem} ${displayTab == "certifications" && styles.tabItemActive}`}
            onClick={() => {
              setDisplayTab("certifications")
            }}
          >
            Certifications
            <div className={styles.hoverThing} />
          </div>
          <div
            className={`${styles.tabItem} ${displayTab == "articles" && styles.tabItemActive}`}
            onClick={() => {
              setDisplayTab("blogs")
            }}
          >
            Blogs
            <div className={styles.hoverThing} />
          </div>
        </div>

        {displayTab == "info" && (
          <>
            <div className={styles.projectsSection}>
              {/* Move GitHub contributions above the heading as requested */}
              <GitHubContributions username="aliiqbal208" />

              <h1 className="font-mono font-semibold underline leading-10 text-3xl">Projects</h1>

              {isLoadingProjects ? (
                <div className="flex justify-center items-center py-20">
                  <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900 dark:border-white"></div>
                </div>
              ) : projectDisplayList.length === 0 ? (
                <div className="text-center py-10 text-gray-600 dark:text-gray-400">
                  <p>No projects found. Please check your configuration.</p>
                </div>
              ) : (
                <>
                  <div className={styles.projectsHolder}>
                    {projectDisplayList.map((project, index) => (
                      <div key={index} className="flex flex-col gap-[10px]">
                        <ProjectCard projectDetails={project} />
                        {index < projectDisplayList.length - 1 && (
                          <div className="bg-[var(--fgColor)] w-[90%] opacity-[0.4] font-semibold h-0.5 mx-6 my-0"></div>
                        )}
                      </div>
                    ))}
                  </div>
                  {projectsList.length > 3 && (
                    <div
                      onClick={() => {
                        if (showMoreProject == "less") {
                          setProjectDisplayList(projectsList)
                          setShowMoreProject("more")
                        } else {
                          setProjectDisplayList(projectsList.slice(0, 3))
                          setShowMoreProject("less")
                        }
                      }}
                      className={styles.showMore}
                    >
                      {showMoreProject == "less" && (
                        <>
                          Show More <ChevronRight size={20} />
                        </>
                      )}
                      {showMoreProject == "more" && (
                        <>
                          <ChevronLeft size={20} />
                          Show less
                        </>
                      )}
                    </div>
                  )}
                </>
              )}
            </div>

            <div className={styles.techStack}>
              <h1 className="font-mono font-semibold text-4xl">Technical Expertise</h1>

              <div className="relative flex w-full flex-col items-center justify-center overflow-hidden">
                <Marquee pauseOnHover className="[--duration:35s]">
                  {techStack1.map((tech, index) => (
                    <div key={index} className={styles.techStackItem}>
                      <Image alt="" src={tech.iconUrl || "/placeholder.svg"} height={20} width={20} unoptimized />
                      <p>{tech.name}</p>
                    </div>
                  ))}
                </Marquee>
                <Marquee reverse pauseOnHover className="[--duration:35s]">
                  {techStack2.map((tech, index) => (
                    <div key={index} className={styles.techStackItem}>
                      <Image alt="" src={tech.iconUrl || "/placeholder.svg"} height={20} width={20} unoptimized />
                      <p>{tech.name}</p>
                    </div>
                  ))}
                </Marquee>

                <div className="pointer-events-none absolute inset-y-0 left-0 w-1/4 bg-gradient-to-r from-[var(--bgColor)]"></div>
                <div className="pointer-events-none absolute inset-y-0 right-0 w-1/4 bg-gradient-to-l from-[var(--bgColor)]"></div>
              </div>
            </div>
          </>
        )}

        {displayTab == "experience" && (
          <>
            <div className="mt-[30px] w-full mx-auto max-w-[1100px] px-4 sm:px-6">
              <ExperienceSection />
            </div>
          </>
        )}

        {displayTab == "certifications" && (
          <div className="mt-[30px] w-full mx-auto max-w-[1100px]">
            <h2 className="text-[22px] font-semibold mb-4 font-mono">Certifications</h2>
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {certifications.map((c, i) => (
                <div key={i} className="rounded-xl border border-white/10 p-4 bg-white/5">
                  <Link
                    href={c.proofUrl}
                    target="_blank"
                    className="group relative block aspect-[16/10] overflow-hidden rounded-md"
                    aria-label={`Open certificate proof: ${c.title}`}
                  >
                    <Image
                      src={c.imageUrl || "/placeholder.svg"}
                      alt={`${c.title} preview`}
                      fill
                      className="object-cover"
                      priority
                    />
                    <div
                      className="absolute right-3 top-3 inline-flex items-center justify-center rounded-full bg-black/70 p-2 text-white
                                 group-hover:bg-black/80 transition"
                      aria-hidden="true"
                    >
                      <ArrowUpRight size={18} />
                    </div>
                  </Link>
                  <div className="mt-3">
                    <h3 className="font-mono font-bold text-lg">{c.title}</h3>
                    <p className="opacity-80 text-base underline">{c.issuer}</p>
                    <p className="opacity-70 mt-1 text-sm">{c.summary}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {displayTab == "articles" && (
          <>
            <div className="flex flex-col mx-auto gap-[10px] w-[100%] max-w-[500px] mt-[50px]">
              {blogsArray && blogsArray.map((blog, index) => <DefaultBlogCard blogData={blog} key={index} />)}
            </div>
          </>
        )}

        <div className={styles.pageFooter}>
          <Link href="/resume">
            <p className={`flex items-center gap-[5px] underline font-mono font-bold text-2xl leading-[0.55rem] ${styles.resumeBtn}`}>
              Resume <ArrowUpRight className="w-auto h-[26px]" size={16} />
            </p>
          </Link>
          <PoweredBy />
        </div>
      </div>
    </div>
  )
}
