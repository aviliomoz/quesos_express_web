type Props = {
  children: JSX.Element | JSX.Element[];
};

export default async function RestaurantLayout({ children }: Props) {
  // Aqui va la validacion de si el restaurante existe y si el usuario es miembro

  return children;
}
