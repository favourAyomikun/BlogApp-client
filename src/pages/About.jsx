import React from "react";
import { Navbar } from "../components/Navbar";

export const About = () => {
  return (
    <main className="pt-24 h-screen md:h-screen">
      <Navbar />
      <div className="w-[70%] md:w-[50%] mx-auto mt-5 md:mt-20">
      <div className="text-base md:text-xl font-semibold tracking-wide leading-loose text-[#888888]">
        Hey there! I'm Favour, the creative mind behind F.A's Blog. Welcome to
        my digital space! I'm all about bringing you various categories on this
        blog, where you'll find the latest trending news from around the world.
        Join me in exploring these exciting updates. Feel free to share your
        thoughts, and let's make F.A's Blog a community. Connect with me on
        social media platforms, and let's embark on this journey together. As a
        user, you can also upload your desired content. Thanks for being here! <br />
        Favour.
      </div>
      </div>
    </main>
  );
};
