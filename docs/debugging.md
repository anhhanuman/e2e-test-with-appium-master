# Debugging

## Set `debug` point in Automation Test

1. Put `browser.debug();` above the line you would like to debug.
2. Start testing application.
3. WebDriverAgent Debug port will be printed out as `webkitDebugProxyPort` on Terminal when E2E script started.

   ![Test Devices Info](https://i.imgur.com/ty7CkE6.png)
4. WebDriverIO will pause the execution of testing if it meets line `browser.debug();`

   ![Script will be paused](https://i.imgur.com/Pa9yXpO.png)

5. Open `http://localhost:<webkitDebugProxyPort>` on Chromium-based browser and open Developer Tools. NodeJS DevTools
   will appear on navigation bar of Developer Tools, clickAndWaitForNotDisplay on it:

   ![NodeJS DevTools](https://i.imgur.com/ALCaaxx.png)

6. Switch to `Console` tab, enter code you want to debug, like below:

   ![Debugging using NodeJS DevTools](https://i.imgur.com/GO8SEKz.png)

## View WebDriverIO logs during runtime

1. Check the existing status of file `logs/wdio-0-0.log` in workspace
2. If this file is exists, enter the command below before **starting** automation script

    ```bash
    $ tail -F logs/wdio-0-0.log
    ``` 

3. If this file **IS** not exists:
    - Start the automation test
    - Screen until this line appear on Terminal:

      ```[0-0] RUNNING in <PATH_TO_YOUR_IPA_FILE>```

    - Repeat step 2 for viewing log file.

