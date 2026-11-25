/* Any component can open the résumé viewer without sharing state: the viewer
   (components/ResumeViewer.tsx, mounted once in app/page.tsx) listens for this. */
export const RESUME_OPEN_EVENT = "resume-viewer:open";

export function openResumeViewer() {
  window.dispatchEvent(new Event(RESUME_OPEN_EVENT));
}
