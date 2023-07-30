import * as Dialog from "@radix-ui/react-dialog";
import { FC, ReactNode } from "react";
import { IoMdClose } from "react-icons/io";

interface ModalProps {
  isOpen: boolean;
  onChange: (open: boolean) => void;
  title: string;
  description: string;
  children: ReactNode;
}
const Modal: FC<ModalProps> = (props) => {
  const { isOpen, onChange, title, description, children } = props;

  return (
    <Dialog.Root open={isOpen} defaultOpen={isOpen} onOpenChange={onChange}>
      <Dialog.Portal>
        <Dialog.Overlay
          className={"bg-neutral-900/40 backdrop-blur-sm fixed inset-0"}
        />
        <Dialog.Content
          className={`fixed
            drop-shadow-md
            border
            border-neutral-600
            bg-neutral-800
            top-[50%]
            left-[50%]
            max-h-full
            h-full
            md:h-auto
            md:max-h-[85vh]
            w-full
            md:w-[90vw]
            md:max-w-[450px]
            translate-x-[-50%]
            translate-y-[-50%]
            rounded-md
            p-[25px]
            focus:outline-none`}
        >
          <Dialog.Title className={"text-xl text-center font-bold mb-4"}>
            {title}
          </Dialog.Title>
          <Dialog.Description
            className={"mb-5 text-sm leading-normal text-center"}
          >
            {description}
          </Dialog.Description>
          <div>{children}</div>
          <Dialog.Close asChild>
            <button
              className={`text-neutral-400
              hover:text-white
              absolute
              top-[10px]
              right-[10px]
              inline-flex
              h-[25px]
              w-[25px]
              appearance-none
              items-center
              justify-center
              rounded-full
              focus:outline-none`}
            >
              <IoMdClose />
            </button>
          </Dialog.Close>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
};

export default Modal;