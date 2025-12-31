"use client";
import { Button, Form, Modal, useFormApi } from "@douyinfe/semi-ui";
import { useCallback, useEffect, useRef, useState } from "react";

export const ImportToken: React.FC = () => {
  const formRef = useRef<Form>(null);

  const globalFormApi = useFormApi();

  const submit = useCallback(async (values: any) => {
    const token = values.token;
    const resp = await fetch(`/api/token?token=${token}`).then((res) =>
      res.json()
    );

    globalFormApi.setValues(
      {
        token,
        days: resp?.data ?? [],
      },
      { isOverride: true }
    );
  }, []);

  useEffect(() => {
    if (localStorage.getItem("data-token")) {
      submit({ token: localStorage.getItem("data-token") });
    }
  }, []);

  const [visible, setVisible] = useState(false);
  return (
    <>
      <Button onClick={() => setVisible(true)}>导入Token</Button>

      <Modal
        title="导入Token"
        visible={visible}
        onOk={() => formRef.current?.formApi.submitForm()}
        onCancel={() => {
          setVisible(false);
          formRef.current?.formApi.reset();
        }}
      >
        <Form
          ref={formRef}
          onSubmit={async (values) => {
            await submit(values);
            setVisible(false);
          }}
        >
          <Form.Input
            label="Token"
            field="token"
            noLabel
            placeholder="请输入Token"
            rules={[
              {
                validator: (_, value) => {
                  try {
                    if (value) {
                      return true;
                    }
                    throw new Error();
                  } catch (error) {
                    return new Error("请输入正确的Token");
                  }
                },
              },
            ]}
          />
        </Form>
      </Modal>
    </>
  );
};
