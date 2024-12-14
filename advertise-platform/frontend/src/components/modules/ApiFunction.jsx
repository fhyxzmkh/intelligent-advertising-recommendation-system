import React, { useState } from "react";
import { Button, message, Modal, Spin } from "antd";
import axios from "axios";

export const ApiFunction = ({ currentUser }) => {
  const [apiKey, setApiKey] = useState(null);
  const [loading, setLoading] = useState(false);

  const fetchApiKey = async () => {
    try {
      setLoading(true);
      const response = await axios.get(
        `http://localhost:8102/api/apikey/get-api`,
        {
          params: { uid: currentUser.uid },
        },
      );

      if (response.data) {
        setApiKey(response.data);
        message.success("API Key retrieved successfully!");
      } else {
        message.info("No API Key found.");
      }
    } catch (error) {
      message.error("Failed to fetch API Key.");
    } finally {
      setLoading(false);
    }
  };

  const addApiKey = async () => {
    try {
      setLoading(true);
      const response = await axios.get(
        `http://localhost:8102/api/apikey/add-api`,
        {
          params: { uid: currentUser.uid },
        },
      );

      if (response.data === "Already has an API key") {
        message.warning("User already has an API Key.");
      } else {
        message.success("API Key created successfully!");
        fetchApiKey();
      }
    } catch (error) {
      message.error("Failed to create API Key.");
    } finally {
      setLoading(false);
    }
  };

  const deleteApiKey = async () => {
    try {
      setLoading(true);
      await axios.get(`http://localhost:8102/api/apikey/delete-api`, {
        params: { uid: currentUser.uid },
      });

      message.success("API Key deleted successfully!");
      setApiKey(null);
    } catch (error) {
      message.error("Failed to delete API Key.");
    } finally {
      setLoading(false);
    }
  };

  const showApiKey = () => {
    Modal.info({
      title: "Your API Key",
      content: (
        <p className="break-words">{apiKey || "No API Key available."}</p>
      ),
    });
  };

  return (
    <>
      <div className="p-6 bg-gray-100 rounded-lg shadow-md flex flex-col justify-center items-center h-screen">
        <h2 className="text-2xl font-bold mb-4">API Key Management</h2>
        <div>
          {loading ? (
            <Spin size="large" />
          ) : (
            <>
              <div className="flex flex-col gap-4">
                <Button type="primary" onClick={fetchApiKey} className="w-48">
                  查看 API Key
                </Button>
                <Button type="dashed" onClick={addApiKey} className="w-48">
                  获取 API Key
                </Button>
                <Button danger onClick={deleteApiKey} className="w-48">
                  删除 API Key
                </Button>
              </div>
              {apiKey && (
                <div className="mt-4">
                  <Button type="link" onClick={showApiKey}>
                    View API Key
                  </Button>
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </>
  );
};
