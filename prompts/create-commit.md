# Step 1:

Given the Git context of files changed:

1. read the changes in each file and put together a short commit message (print each of these)
2. combine all the short commit messages into 1 medium sized commit message (print each of these), it should be 1 line
3. do the above 3 times and provide me with the 3 final outputs

Remember:

- It can be technical since developers will read it.
- Be specific, mention functions and file names if it helps.

# Step 2:

I'll answer with 1, 2 or 3 which corresponds to the COMMIT_MESSAGE_CHOSEN.

I want you to produce an output exactly like so with the COMMIT_MESSAGE_CHOSEN replaced with the actual commit message so I can quickly copy and paste it into my Terminal:

git add . && git commit -m "COMMIT_MESSAGE_CHOSEN" && git push
