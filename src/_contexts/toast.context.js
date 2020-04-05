import React from 'react';

export const ToastContext = React.createContext(null);

export const withToast = Component => props => (
    <ToastContext.Consumer>
        {
            toast => <Component {...toast} {...props} />
        }
    </ToastContext.Consumer>
)

export const ToastNotifier = withToast(({ toasts, removeToast }) => {
    const getStyle = type => {
        switch(type) {
            case 'danger':
                return 'bg-red-300';
            case 'success':
                return 'bg-green-300';
            case 'warning':
                return 'bg-orange-300';
            default:
                return 'theme-bg-text';
        }
    }
    return (
        <div className="ToastNotifier">
            {
                toasts.map(toast => {
                    return (
                        <div className={"toast flex px-4 py-2 mt-2 rounded text-white " + getStyle(toast.type)} key={toast.timestamp}>
                            <div className="toast-body flex-grow">
                                <div className="toast-title">{toast.title}</div>
                                <div className="toast-message">{toast.message}</div>
                            </div>
                            <div className="toast-delete flex-shrink-0" onClick={() => { removeToast(toast) }}>&times;</div>
                        </div>
                    )
                })
            }
        </div>
    );
});