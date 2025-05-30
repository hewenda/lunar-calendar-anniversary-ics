'use client';
import { decompressFromBase64 } from '@/lib/compress';
import { Button, Form, Modal, useFormApi } from '@douyinfe/semi-ui';
import { useCallback, useEffect, useRef, useState } from 'react';

export const ImportIcs: React.FC = () => {
  const formRef = useRef<Form>(null);

  const globalFormApi = useFormApi();

  const submit = useCallback(async (values: any) => {
    const url = new URL(values.url);
    const data = url.pathname.replace('/ics/', '');
    const jsonString = await decompressFromBase64(decodeURIComponent(data));
    const params = JSON.parse(jsonString);

    globalFormApi.setValues(
      {
        days: params.map((item: string[]) => {
          const [day, temp] = item;
          return { day, temp };
        }),
      },
      { isOverride: true }
    );
  }, []);

  useEffect(() => {
    if (localStorage.getItem('icsUrl')) {
      submit({ url: localStorage.getItem('icsUrl') });
    }
  }, []);

  const [visible, setVisible] = useState(false);
  return (
    <>
      <Button onClick={() => setVisible(true)}>导入链接</Button>

      <Modal
        title='导入链接'
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
            label='链接'
            field='url'
            noLabel
            placeholder='请输入订阅链接'
            rules={[
              {
                validator: (_, value) => {
                  try {
                    const url = new URL(value);
                    if (url.pathname.startsWith('/ics/')) {
                      return true;
                    }
                    throw new Error();
                  } catch (error) {
                    return new Error('请输入正确的订阅链接');
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
