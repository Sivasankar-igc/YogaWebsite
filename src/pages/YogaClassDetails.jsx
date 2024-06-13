import React from "react";
import Pageinfo from "../components/Pageinfo";
import { json, useParams } from "react-router-dom";

const classEssays = {
  "Hatha Yoga": `Hatha Yoga, often considered the foundation of all yoga styles, is an ancient practice that harmonizes the body, mind, and spirit. The word “Hatha” is derived from two Sanskrit roots: “Ha,” meaning sun, and “Tha,” meaning moon. This signifies the balance of the masculine aspects—active, hot, sun—and feminine aspects—receptive, cool, moon—within all of us. Hatha Yoga aims to achieve a state of equilibrium and unity between these opposing forces.

The practice of Hatha Yoga is a journey towards self-discovery, not just a physical exercise. It is a methodical approach to developing discipline and concentration through the mastery of the body. A typical Hatha Yoga class involves a series of asanas (postures), pranayama (breathing exercises), and meditation. These elements work together to prepare the body and mind for deeper spiritual practices such as meditation or higher states of consciousness.

Asanas in Hatha Yoga are designed to align your skin, muscles, and bones. The postures are meant to open the many channels of the body—especially the main channel, the spine—so that energy can flow freely. Hatha Yoga is also about balance. Each asana has a counterpose to ensure the body remains balanced. For instance, a forward bend is followed by a backward bend. This balance extends beyond the physical, helping to balance our energy and maintain equilibrium in our lives.

Pranayama, or breath control, is another crucial aspect of Hatha Yoga. It teaches the practitioner to control prana, or life force, through breathing techniques. This control of breath helps to calm the mind, reduce stress, and enhance concentration. Pranayama serves as an important bridge between the outward practices of yoga—like asanas—and the internal, surrendering practices that lead us into deeper states of meditation.

The ultimate goal of Hatha Yoga is not just physical health, but the awakening of the subtle spiritual energy known as kundalini. Traditionally, it is said that once kundalini awakens, it rises through the chakras, or energy centers, along the spine, leading to an expanded state of consciousness, known as samadhi.`,

  "Iyengar Yoga": `Iyengar Yoga, named after its founder B.K.S. Iyengar, is a form of Hatha Yoga known for its focus on precision and alignment in the performance of posture (asana) and breath control (pranayama). It is distinguished by its attention to detail and the use of props, such as belts, blocks, and blankets, to aid practitioners in achieving the correct alignment in various postures. This approach has made yoga more accessible to people of all ages and levels of fitness.

B.K.S. Iyengar began his study of yoga as a teenager and quickly became a master of the art. His teachings emphasize the integration of body, mind, and spirit, and he is credited with bringing yoga to the Western world. Iyengar Yoga is based on the traditional eight limbs of yoga as outlined by Patanjali in the Yoga Sutras, which include ethical disciplines, physical postures, breath control, and meditation.

One of the key aspects of Iyengar Yoga is the sequencing of postures. Iyengar believed that certain sequences could produce specific emotional, mental, and physiological states. For example, a sequence might be designed to develop strength and stamina, improve circulation, focus the mind, or relax the nervous system.

The use of props is another hallmark of Iyengar Yoga. Props enable students to perform asanas which they would otherwise find difficult to do. They are also used to help students hold poses longer, which increases the therapeutic benefits of the asanas. The props are seen as aids to help the practitioner achieve the ultimate aim of yoga, which is to unite with the divine.

Iyengar Yoga is methodical and progressive, emphasizing detailed correctness and absolute safety. When practicing, every movement is considered and each asana is performed with a specific intention. This meticulous approach develops self-awareness and mindfulness, which are essential components of the practice.

The benefits of Iyengar Yoga are manifold. Physically, it helps to improve flexibility, strength, balance, and endurance. Mentally, it encourages relaxation and stress reduction. Spiritually, it seeks to bring the practitioner closer to self-realization and enlightenment.

In conclusion, Iyengar Yoga offers a comprehensive, deeply therapeutic, and inclusive path to health and well-being. It stands out for its precision and the use of props, making it suitable for everyone, regardless of their physical condition or age. Through regular practice, individuals can experience profound transformations, not only in their physical bodies but also in their mental and spiritual lives`,
};

const YogaClassDetails = () => {
  let { title, description } = useParams();


  return (
    <div className="flex flex-col justify-center items-center w-full">
      <Pageinfo name={title} prevpage={"classes"} />
      <div className="py-4 w-[80%]">
        <h2 className="text-2xl font-semibold mb-4">About {title}</h2>
        {description}
      </div>
    </div>
  );
};

export default YogaClassDetails;
