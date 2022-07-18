# Transformalize

Use Code's integrated terminal to run [Transformalize](https://github.com/dalenewman/Transformalize/blob/master/README.md) arrangements.

## Features

This extension features four commands that pass your file (arrangement) to Transformalize's command line interface (*tfl.exe*).

* tfl: init
* tfl: run
* tfl: schema
* tfl: schedule

Use ``CTRL-SHIFT-P`` to find and execute the commands.

![demo](https://raw.githubusercontent.com/dalenewman/Transformalize.VisualStudioCode/master/image/bogus-provider.gif)

## Requirements

Download and decompress the [latest release](https://github.com/dalenewman/Transformalize/releases) of Transformalize. Decompress it, set it as executable, and put it on your `PATH`or set the `tfl.path` setting.  If you have Docker, you can run the Transformalize container (see below).

## Extension Settings

This extension contributes the following settings:

* `tfl.path`: the full path _including_ the Transformalize binary (e.g. `tfl` or `tfl.exe`).  Or, you may set this to run Transformalize from a Docker container (e.g. `docker run -v "$(pwd)":"$(pwd)" --rm --platform linux/amd64 dalenewman/transformalize.cli:0.10.2`). 
