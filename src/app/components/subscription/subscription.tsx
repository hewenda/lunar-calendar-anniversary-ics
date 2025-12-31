import { useFormDays } from "@/app/hooks/use-form-days";
import {
  Form,
  TextArea,
  Input,
  Row,
} from "@douyinfe/semi-ui";
import { useMemo } from "react";

export const Subscription: React.FC = () => {
  const { token, days } = useFormDays();

  const configStr = useMemo(() => {
    if (!days?.length) {
      return "";
    }
    return JSON.stringify(days);
  }, [days]);

  const tokenUrl = useMemo(() => {
    if (!token) {
      return "";
    }

    return new URL(`/token/${token}`, window.location.origin).toString();
  }, [token]);

  return (
    <Row style={{ marginTop: 10 }}>
      {token && (
        <Form.Slot label="Token">
          <Input value={tokenUrl} />
        </Form.Slot>
      )}
      <Form.Slot label="配置信息">
        <TextArea value={configStr} />
      </Form.Slot>
    </Row>
  );
};
