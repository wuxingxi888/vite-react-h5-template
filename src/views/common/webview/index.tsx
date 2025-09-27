/* eslint-disable @eslint-react/dom/no-unsafe-iframe-sandbox */
import { useLayoutEffect, useRef, useState } from 'react';
import { useLocation } from 'react-router';

import { Toast } from 'antd-mobile';
import type { ToastHandler } from 'antd-mobile/es/components/toast';

import CustomNavBar from '@/components/CustomNavBar';

const WebView: React.FC = () => {
    const [iframeUrl, setIframeUrl] = useState<string>('');
    const [title, setTitle] = useState<string>('WebView');
    const location = useLocation();

    const handler = useRef<ToastHandler>();

    const showLoading = () => {
        handler.current = Toast.show({
            icon: 'loading',
            content: '加载中…',
            duration: 0,
            maskClickable: true,
        });
    };

    const closeLoading = () => {
        handler.current?.close();
    };

    useLayoutEffect(() => {
        const searchParams = new URLSearchParams(location.search);
        const url = searchParams.get('url');
        const titleParam = searchParams.get('title');

        if (url) {
            setIframeUrl(url);
        }

        if (titleParam) {
            setTitle(titleParam);
        }

        showLoading();

        return () => {
            closeLoading();
        };
    }, [location.search]);

    const onHandleLoadFinish = () => {
        closeLoading();
    };

    const onRefresh = () => {
        showLoading();
        window.location.reload();
    };

    const onHandleError = () => {
        console.log('onHandleError');
        closeLoading();
        Toast.show({
            content: '加载失败，请检查URL或网络连接',
        });
    };

    return (
        <div className="h-screen flex flex-col">
            <CustomNavBar
                right={
                    <span
                        className="i-ic:sharp-refresh mr-2 text-xl"
                        onClick={() => onRefresh()}
                    ></span>
                }
            >
                {title}
            </CustomNavBar>
            <iframe
                src={iframeUrl}
                className="w-full flex-1"
                allowFullScreen={true}
                referrerPolicy="no-referrer"
                sandbox="allow-scripts allow-forms allow-popups allow-same-origin"
                allow="autoplay; fullscreen; geolocation; microphone; camera; midi; accelerometer; gyroscope; payment; ambient-light-sensor; encrypted-media; usb"
                onLoad={onHandleLoadFinish}
                onError={onHandleError}
            />
        </div>
    );
};

export default WebView;
