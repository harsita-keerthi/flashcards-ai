'use client'

import {useUser} from "@clerk/next.js"
import {useEffect, useState} from "react"
import {collection, doc, getDoc, getDocs} from "firebase/firestore"