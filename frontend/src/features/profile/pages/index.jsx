import React from "react";

const ProfilePage = () => {
  const user = {
    name: "Zeamanuel Zeleke",
    email: "zeamanuelfelke@gmail.com",
    image:
      "https://fastly.picsum.photos/id/411/200/300.jpg?hmac=HAAfOgAOgDPvxb7JO5zY-aR9Q-mJoDxYkZqNpoadhbw",
    history: {
      created: [
        {
          name: "Noh Real State",
          image:
            "https://fastly.picsum.photos/id/514/200/200.jpg?hmac=ywW8zoc6PM1wbLeZvKJPGczujmQgEM7QOTaWiOTjhjM",
          price: 980,
        },
        {
          name: "Luxury Villa",
          image:
            "https://fastly.picsum.photos/id/411/200/300.jpg?hmac=HAAfOgAOgDPvxb7JO5zY-aR9Q-mJoDxYkZqNpoadhbw",
          price: 1500,
        },
        {
          name: "Real State",
          image:
            "https://fastly.picsum.photos/id/411/200/300.jpg?hmac=HAAfOgAOgDPvxb7JO5zY-aR9Q-mJoDxYkZqNpoadhbw",
          price: 554,
        },
      ],
      owned: [
        {
          name: "Real State",
          image:
            "https://fastly.picsum.photos/id/411/200/300.jpg?hmac=HAAfOgAOgDPvxb7JO5zY-aR9Q-mJoDxYkZqNpoadhbw",
          price: 554,
        },
        {
          name: "Cosy Apartment",
          image:
            "https://fastly.picsum.photos/id/237/200/300.jpg?hmac=HAAfOgAOgDPvxb7JO5zY-aR9Q-mJoDxYkZqNpoadhbw",
          price: 300,
        },
      ],
    },
  };

  return <div className="flex w-full justify-between mx-auto"></div>;
};

export default ProfilePage;
