import { Button } from "@mantine/core";
import { useMediaQuery } from "@mantine/hooks";
import { modals } from "@mantine/modals";

function AuthButton({
  title,
  children,
  customStyle,
  modalTitle,
}: {
  title: string;
  modalTitle: string;
  children: React.ReactNode;
  customStyle?: any;
}) {
  const isMobile = useMediaQuery("(max-width: 50em)");

  return (
    <Button
      style={customStyle}
      onClick={() => {
        modals.open({
          title: modalTitle,
          fullScreen: isMobile,
          centered: true,
          children,
        });
      }}
    >
      {title}
    </Button>
  );
}

export default AuthButton;
