import React from 'react';

const BottomSheet = ({
  header = '',
  subHeading = '',
  isOpen = false,
  toggleDrawer,
  children,
}) => {
  return (
    isOpen && (
      <>
        {/* Overlay to fade the screen */}
        <div
          className="fixed inset-0 bg-gray-500 opacity-50 z-20"
          onClick={toggleDrawer}
        />
        {/* Drawer */}
        <div
          style={{ maxWidth: '500px' }}
          className="fixed mx-auto inset-x-0 bottom-0 z-30 overflow-y-auto"
        >
          <div
            className="shadow-lg rounded-t-3xl min-h-96 p-7"
            style={{ background: '#F7F2F9' }}
          >
            {/* Header */}
            <div>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-6 h-6 cursor-pointer"
                onClick={toggleDrawer}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M9.75 9.75l4.5 4.5m0-4.5l-4.5 4.5M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>

              {header && (
                <h1 className="text-2xl font-bold text-neutral-800 dark:text-neutral-100 mt-5 mb-0.5">
                  {header}
                </h1>
              )}
              {subHeading && (
                <p className="text-sm text-neutral-600 dark:text-neutral-200">
                  {subHeading}
                </p>
              )}
            </div>

            {/* children */}
            {children && <div className="mb-24">{children}</div>}
          </div>
        </div>
      </>
    )
  );
};

export default BottomSheet;
