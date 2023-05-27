import { ReactNode } from "react";

export const metadata = {
  title: "Create a Free Online Quiz",
  description:
    "Easily create a quiz to share with friends and family. Give your quiz a name, add multiple choice questions, and then share to the world.",
};

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <>
      <nav className="navbar navbar-expand-lg bg-light mb-0">
        <div className="container-fluid">
          <a className="navbar-brand" href={"/"} title="Homepage">
            Quiz App
          </a>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNavAltMarkup"
            aria-controls="navbarNavAltMarkup"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
            <div className="navbar-nav">
              <a className="nav-link" href={"/create"}>
                Create
              </a>
            </div>
          </div>
        </div>
      </nav>
      <div className="content-container">{children}</div>
    </>
  );
}
