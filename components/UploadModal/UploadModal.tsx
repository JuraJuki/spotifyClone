"use client";
import Button from "@/components/Button";
import Input from "@/components/Input";
import Modal from "@/components/Modal";
import { useUploadModalSubmit } from "@/components/UploadModal/useUploadModalSubmit";
import { useUploadModal } from "@/hooks/useUploadModal";
import { FC } from "react";
import { FieldValues, useForm } from "react-hook-form";

const UploadModal: FC = () => {
  const uploadModal = useUploadModal();
  const { register, handleSubmit, reset } = useForm<FieldValues>({
    defaultValues: {
      author: "",
      title: "",
      song: null,
      image: null,
    },
  });
  const { onSubmit, isLoading } = useUploadModalSubmit(reset);
  const onChange = (open: boolean) => {
    if (!open) {
      reset();
      uploadModal.onClose();
    }
  };

  return (
    <Modal
      title="Add a song"
      description="Upload an mp3 file"
      isOpen={uploadModal.isOpen}
      onChange={onChange}
    >
      <form
        onSubmit={handleSubmit(onSubmit)}
        className={"flex flex-col gap-y-4"}
      >
        <Input
          id={"title"}
          disabled={isLoading}
          {...register("title", { required: true })}
          placeholder={"Song title"}
        />
        <Input
          id={"author"}
          disabled={isLoading}
          {...register("author", { required: true })}
          placeholder={"Song author"}
        />
        <div>
          <div className={"pb-1"}>Select a song file</div>
          <Input
            id={"song"}
            type={"file"}
            disabled={isLoading}
            accept={".mp3"}
            {...register("song", { required: true })}
          />
        </div>
        <div>
          <div className={"pb-1"}>Select an image</div>
          <Input
            id={"image"}
            type={"file"}
            disabled={isLoading}
            accept={"image/*"}
            {...register("image", { required: true })}
          />
        </div>
        <Button disabled={isLoading} type={"submit"}>
          Create
        </Button>
      </form>
    </Modal>
  );
};

export default UploadModal;
