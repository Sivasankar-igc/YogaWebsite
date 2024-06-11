import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  classes: [
    {
      id: 1,
      title: "Hatha Yoga",
      desc: "A slow and mindful practice focusing on basic postures and breath control.",
      img: "/Bruk.png",
    },
    {
      id: 2,
      title: "Iyengar Yoga",
      desc: "Known for its use of props and emphasis on precision and alignment.",
      img: "/Sukh.png",
    },
    {
      title: "Kundalini Yoga",
      desc: "Combines energy work with breath, movement, and chanting to awaken spiritual energy.",
      img: "../Yogini.png",
      href: "javascript:void(0)",
    },
    {
      title: "Ashtanga Yoga",
      desc: "A fixed sequence of postures linked by breath, it's physically demanding.",
      img: "../Bruk.png",
      href: "javascript:void(0)",
    },
    {
      title: "Bikram Yoga",
      desc: "Performed in a hot room to promote sweating and flexibility.",
      img: "../Sukh.png",
      href: "javascript:void(0)",
    },
    {
      title: "Yin Yoga",
      desc: "A passive style that targets deep connective tissues, holding poses for longer periods.",
      img: "../Yogini.png",
      href: "javascript:void(0)",
    },
    {
      title: "Restorative Yoga",
      desc: "Uses props to support the body, encouraging deep relaxation.",
      img: "../Bruk.png",
      href: "javascript:void(0)",
    },
    {
      title: "Jivamukti Yoga",
      desc: "Integrates physical, ethical, and spiritual elements for a holistic practice.",
      img: "../Sukh.png",
      href: "javascript:void(0)",
    },
    {
      title: "Aerial Yoga",
      desc: "Uses a hammock to perform yoga poses in the air, adding an acrobatic element.",
      img: "../Yogini.png",
      href: "javascript:void(0)",
    },
    {
      title: "Core Strength Vinyasa Yoga",
      desc: "Focuses on flow and breath, building core strength.",
      img: "../Bruk.png",
      href: "javascript:void(0)",
    },
    {
      title: "Prenatal Yoga",
      desc: "Tailored for expectant mothers, offering a safe and supportive environment.",
      img: "../Sukh.png",
      href: "javascript:void(0)",
    },
    {
      title: "Anusara Yoga",
      desc: "A playful style that often includes partner work and focuses on heart-opening poses.",
      img: "../Yogini.png",
      href: "javascript:void(0)",
    },
    {
      title: "Acro Yoga",
      desc: "Combines yoga and acrobatics, emphasizing partner work and inversions.",
      img: "../Bruk.png",
      href: "javascript:void(0)",
    },
  ],
};

const classesSlice = createSlice({
  name: "classes",
  initialState,
  reducers: {
    addClass: (state, action) => {
      state.classes.push({ ...action.payload, id: Date.now() });
    },
    deleteClass: (state, action) => {
      state.classes = state.classes.filter(
        (yogaClass) => yogaClass.id !== action.payload
      );
    },
    editClass: (state, action) => {
      const { id, title, desc, img } = action.payload;
      const existingClass = state.classes.find(
        (yogaClass) => yogaClass.id === id
      );
      if (existingClass) {
        existingClass.title = title;
        existingClass.desc = desc;
        existingClass.img = img;
      }
    },
  },
});

export const { addClass, deleteClass, editClass } = classesSlice.actions;
export default classesSlice.reducer;
